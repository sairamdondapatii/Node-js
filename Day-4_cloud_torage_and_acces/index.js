const express = require('express');
const {connection} = require('./database.js')
const {heroRouter} = require('./routes/hero/Hero.router.js')
const {userRouter} = require('./routes/user/User.router.js')


const app = express();

app.use(express.json());


app.get('/',(req,res)=>{
    res.send('welcome')
})



app.use('/users',userRouter)
app.use('/heros',heroRouter)





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
