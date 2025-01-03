const express = require('express');
const { UserModel } = require("../model/User.model");
const jwt = require('jsonwebtoken');

const userRouter = express.Router();


userRouter.post('/register', async(req,res)=>{
    try {
        const user = new UserModel(req.body)
        await user.save()
        res.status(200).json({'message':'User Created Successfully'})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({'error':error.message})
    }
})

userRouter.post('/login', async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({$and:[{email:email},{password:password}]});
        console.log(user)
        if(user){
            const token = jwt.sign({ name: 'ram' }, 'shhhhh');
            res.status(200).json({'message':'Login Successfully','token':token})
        }else{
            res.status(200).json({'message':'invalid password or email'})
        }
        
    } catch (error) {
        console.log(error)
    }
})


module.exports = {userRouter}