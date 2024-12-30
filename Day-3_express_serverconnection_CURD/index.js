const express = require('express');
const {connection} = require('./database.js')
const {UserModel} = require('./user/userSchema.js')

const app = express();

app.use(express.json());


app.get('/',(req,res)=>{
    
    res.send('welcome')
})



app.post('/createuser',async (req,res)=>{
    const data = req.body;
    try {
        const user = new UserModel(req.body)
        await user.save();
    } catch (error) {
        console.log(error)
        
    }
    // console.log(data)
    res.send('User created')
})

app.get('/users',async (req,res)=>{
    try {
        const users = await UserModel.find()
        res.send(users)
        
    } catch (error) {
        console.log(error)
    }
})


app.patch('/edituser/:userID', async (req,res)=>{
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

app.delete('/deleteuser/:userID',async (req,res)=>{
    const userID = req.params.userID;
    const payload = req.body;
    try {
        await UserModel.findByIdAndDelete({'_id':userID});
        res.send(`user with userid:${userID} deleted`)
        
    } catch (error) {
        console.log(error);
        res.send('Error deleting user')
    }
})


app.listen('8090', async ()=>{
    try {
        await connection;
        console.log('connected to db')
        
    } catch (error) {
        console.log(error)
        console.log('connection failed')
    }
    console.log('running on port no  8090');
})
