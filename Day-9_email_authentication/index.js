const express = require('express');
const { connection } = require('./config/db');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { userRouter } = require('./routes/UserRouter');
const { auth } = require('./middleware/auth');
const nodemailer = require('nodemailer');
require('dotenv').config();
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

const transporter = nodemailer.createTransport({
    service:'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.USER,
        pass: process.env.APP_PASS
    }
});


function otpgenerator(){
    let otp ='';
    for(let i=0; i<6; i++){
        otp = otp + Math.floor(Math.random()*10);
    }
    return otp;
}

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




  app.get("/get-otp", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
    const otp = otpgenerator();
    try {
      const result = await transporter.sendMail({
        to: [email],
        from: "dondapatiram34@gmail.com",
        subject: "otp verification",
        text: `your otp for the password reset process is ${otp}`,
      })
        console.log(result);
        req.session.OTP = otp;
        console.log("otp", req.session.OTP);
        res.send("Email sent");
    } catch (error) {
        console.log("error", error);
        console.log(error.message);
        res.send("something wrong happend");
    }
  });
  
  app.get("/verify-otp", async (req, res) => {
    const { OTP } = req.query;
    const serverOtp = req.session.OTP;
    console.log(OTP, serverOtp);
  
    if (OTP == serverOtp) {
      res.send("OTP verified");
    } else {
      res.send("wrong otp");
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