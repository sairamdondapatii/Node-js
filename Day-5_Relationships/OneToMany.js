const express = require('express');
const {connection} = require('./database.js')
const {customerModel,orderModel} = require('./customerOrderSchema.js')



const app = express();

app.use(express.json());


app.get('/',(req,res)=>{
    res.send('welcome');
});


app.post('/customer', async (req,res)=>{
    const orders = await orderModel.insertMany(req.body.orders);
    const orderIds = orders.map((order)=>order._id);
    const customer = await customerModel.create({...req.body.user,orders:orderIds})
    res.json(customer)
});

app.get('/customer/:id', async (req,res)=>{
    const customer = await customerModel.findById(req.params.id).populate('orders')
    res.json(customer)
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
