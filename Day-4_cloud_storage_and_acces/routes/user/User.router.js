const express = require('express')
const {UserModel} = require('../../models/User.model')


const userRouter = express.Router()

userRouter.post('/createuser',async (req,res)=>{
    try {
        const user =  UserModel.insertMany(req.body)
        await user;
    } catch (error) {
        console.log(error)
        
    }
    // console.log(data)
    res.send('User created')
})

userRouter.get('/',async (req,res)=>{
    try {
        const users = await UserModel.find()
        res.send(users)
        
    } catch (error) {
        console.log(error)
    }
})


userRouter.patch('/edituser/:userID', async (req,res)=>{
    const userID = req.params.userID;
    const payload = req.body;
    try {
        await UserModel.findByIdAndUpdate({'_id':userID},payload)
        res.send('user has been updated')
        
    } catch (error) {
        console.log(error)
        res.send('Something went wrong')
    }

})

userRouter.delete('/deleteuser/:userID',async (req,res)=>{
    const userID = req.params.userID;
    
    try {
        await UserModel.findByIdAndDelete({'_id':userID});
        res.send(`user with userid:${userID} deleted`)
        
    } catch (error) {
        console.log(error);
        res.send('Error deleting user')
    }
})


module.exports = {userRouter}