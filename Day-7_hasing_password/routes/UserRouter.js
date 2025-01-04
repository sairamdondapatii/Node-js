const express = require('express');
const { UserModel } = require("../model/User.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRouter = express.Router();


userRouter.post('/register', async(req,res)=>{
    const {email,password,name,age} = req.body
    try {
        bcrypt.hash(password, 5, async function(err, hash) {
            if(hash){
                const user = new UserModel({email,password:hash,name,age})
                await user.save()
                res.status(200).json({'message':'User Created Successfully'})
            }else{
                res.status(400).json({'error':err.message})
            }
        });
        
    } catch (error) {
        console.log(error)
        res.status(400).json({'error':error.message})
    }
})
userRouter.post('/login', async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email:email});
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                // result == true
                if(result){
                    const token = jwt.sign({ name: 'ram' }, 'shhhhh');
                    res.status(200).json({'message':'Login Successfully','token':token})
                }else{
                    res.status(400).json({'message':'invalid password or email'})
                }
            });
        }else{
            res.status(200).json({'message':'invalid email'})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({'error':error.message})
    }
})


module.exports = {userRouter}