const express = require('express');
const {connection} = require('./database.js')
const {customerModel,productModel} = require('./customerProductsSchema.js')



const app = express();

app.use(express.json());


app.get('/',(req,res)=>{
    res.send('welcome');
});


app.post('/customer', async (req,res)=>{
    const products = await productModel.insertMany(req.body.products);
    const productIds = products.map((product)=>product._id);
    const customer = await customerModel.create({...req.body.customer,purchaseByProducts:productIds});

    await productModel.updateMany({_id:{$in:productIds}},{$push:{purchaseByCustomers:customer._id}})
    res.json(customer)
});

app.get('/customer/:id', async (req,res)=>{
    const customer = await customerModel.findById(req.params.id).populate('purchaseByProducts')
    res.json(customer)
})


app.get('/product/:id', async (req,res)=>{
    const products = await productModel.findById(req.params.id).populate('purchaseByCustomers')
    res.json(products)
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
