const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service:'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'dondapatiram34@gmail.com',
        pass: process.env.APP_PASS
    }
});


const send = async () => {
    try {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Sairam" <dondapatiram34@gmail.com>', // sender address
            to: "sairamdondapatii@gmail.com", // list of receivers
            subject: "Nodemail code", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
        
        console.log("Message sent:", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    } catch (error) {
        console.log(error)
    }
  }
  
send();