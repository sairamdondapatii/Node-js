const express = require('express');
const {connection} = require('./database.js');
const { userRouter } = require('./routes/UserRouter.js');
const jwt = require('jsonwebtoken');


const app = express();

app.use(express.json());

app.use('/',userRouter);

app.get('/movies',(req,res)=>{
    // console.log(req.query)
    const {token} = req.query
    jwt.verify(token, 'shhhhh', (error,decoded)=>{
        // console.log(decoded.name)
        if( decoded){
            res.status(200).send('Movies data')
        }else{
            res.status(400).send({'error':error.message})
        }
    })
    
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
