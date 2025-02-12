const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { userModel } = require('../models/UserModel');
const { logger } = require('../middlewares/loggermiddleware');


const userRouter = express.Router();


// User registration ---
userRouter.post('/register', async (req,res)=>{
    try {
        const {username,email,password,role} = req.body;
        const isUser = await userModel.findOne({email});
        if(isUser){
            res.status(400).send({'messege':'User with this email alredy exists'});
        };
        const hashedPassword = bcrypt.hashSync(password,5)
        const newUser = new userModel({...req.body , password:hashedPassword});
        await newUser.save();
        res.status(400).send({message:'Registred Successfully',user:newUser})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({error:error.message})
    }
});

// user login ---
userRouter.post('/login', logger ,async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            res.status(400).send({message:'user not exists please regiser'})  
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            res.status(400).json({'message':'invalid password'});
        };
        const token = jwt.sign({email,username:user.username,user_id:user._id},'sai');
        res.status(400).json({'message':'login Success','token':token})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({error:error.message})
    }
})




module.exports = {userRouter}