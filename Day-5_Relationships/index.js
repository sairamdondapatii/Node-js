const express = require('express');
const {connection} = require('./database.js')
const {userModel,addressModel} = require('./userSchema.js')



const app = express();

app.use(express.json());


app.get('/',(req,res)=>{
    res.send('welcome')
})


app.post('/user',async (req,res)=>{
    try {
        const address =await  addressModel.create(req.body.address);
        const user = await userModel.create({...req.body.user,address:address._id})
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})

app.get('/user/:id',async (req,res)=>{
    try {
        const user = await userModel.findById(req.params.id).populate('address')
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})
app.get('/users',async (req,res)=>{
    try {
        const user = await userModel.find().populate('address')
        res.json(user)
    } catch (error) {
        console.log(error)
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
