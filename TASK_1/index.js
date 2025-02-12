const express = require('express');
const { userRouter } = require('./Routes/UserRoute');
const { connection } = require('./config/db');
const { bookRouter } = require('./Routes/BookRoute');


const app = express();

app.use(express.json());


app.use('/',userRouter);

app.use('/', bookRouter)

app.listen('8090',async()=>{
    try {
        await connection;
        console.log('connected to db')
    } catch (error) {
        console.log(error)
    }
    console.log('running on port number http://localhost:8090');
})