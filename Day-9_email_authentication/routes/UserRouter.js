const express = require('express');
const bcrypt = require('bcrypt');


const { UserModel } = require('../model/UserModel');
const { BlacklistModel } = require('../model/blacklistModel');


const userRouter = express.Router();


userRouter.post('/signup',async (req,res)=>{
    try {
        const {name,email,password,role}=req.body;
        const isUser = await UserModel.findOne({email});

        if(isUser){
            return res.status(400).send({message:'user alredy exists, please login'});
        }

        const hashPassword = bcrypt.hashSync(password,5);
        const newUser = new UserModel({...req.body , password:hashPassword});
        await newUser.save()
        res.send({message:'signup successful', user:newUser })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error:error.message})
        
    }

})

userRouter.post('/login',async (req,res)=>{

    try {

        const {email , password} = req.body;
        const User = UserModel.findOne({email});
        if(!User){
            return res.status(400).send({ message: "No user found, please signup" });
        };
        const isPassword = bcrypt.compare(password,User.password);
        if(!isPassword){
            return res.status(400).send({ message: "invalid password" });

        };

        const accessToken = jwt.sign({email,role:User.role},'accesstoken',{expiresIn:'1m'});
        const refreshToken = jwt.sign({email,role:User.role},'refreshtoken',{expiresIn:'5m'});
        
        res.cookie('accessToken',accessToken,{maxAge:1000*60});
        res.cookie('refreshToken',refreshToken,{maxAge:5000*60});
        res.send({message:'login successfully'})

    } catch (error) {
        console.log(error)
        res.status(500).send({error:error.message})
        
    }
    
})

userRouter.get('/logout',async (req,res)=>{
    try {

        const {accessToken,refreshToken} = req.cookies;
        const blacklistAccessToken = new BlacklistModel(accessToken);
        const blacklistRefreshToken = new BlacklistModel(refreshToken);
        await blacklistAccessToken.save();
        await blacklistRefreshToken.save();
        res.send({message:'logout successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).send({error:error.message})
        
    }
    
})


userRouter.get('/refresh-token', async(req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken || req?.headers?.authorization;
        const isTokenBlacklisted = await BlacklistModel.find({blacklist:refreshToken});
        if(isTokenBlacklisted) return res.status(400).send({ message: "please login" });
        
        const isTokenValid = jwt.verify(refreshToken,'refreshtoken');

        if(!isTokenValid) return res.status(400).send({ message: "please login again" });

        const newAccessToken = jwt.sign({email:isTokenValid.email, role:isTokenValid.role},'accesstoken',{expiresIn:'1m'})


        res.cookie('accessToken', newAccessToken,{maxAge:1000*60})
        res.send({ message: "token generated" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})