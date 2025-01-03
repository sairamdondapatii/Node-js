const express = require('express');
const {connection} = require('./database.js');
const { userRouter } = require('./routes/UserRouter.js');
const { auth } = require('./middleware/auth.middleware.js');


const app = express();

app.use(express.json());

app.use('/',userRouter);


app.use(auth) // if it sucess then only it will execute belo code

app.get('/movies',(req,res)=>{
    res.status(200).send('Movies data')
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
