const express = require('express');
const { connection } = require('./config/db');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { userRouter } = require('./routes/UserRouter');
const { auth } = require('./middleware/auth');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
    })
  );


app.get('/',(req,res)=>{
    res.send('WELCOME')
})


app.use('/auth',userRouter)

app.use(auth);
app.get("/protected", (req, res) => {
    try {
      res.send("protected data");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  });


app.listen('8090',async ()=>{
    try {
        await connection;
        console.log('connected to db')
        
    } catch (error) {
        console.log(error)
        
    }
    console.log('running on port number 8090')
})