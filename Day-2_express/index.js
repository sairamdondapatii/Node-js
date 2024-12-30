const express = require('express');
const fs = require('fs');
const app = express()

app.use(express.json())

app.get('/students',(req,res)=>{
    const data = JSON.parse(fs.readFileSync('./db.json','utf-8'));
    console.log(data.students)
    res.send(data.students)
})

app.post('/addstudents',(req,res)=>{
    const data = JSON.parse(fs.readFileSync('./db.json','utf-8'));
    data.students.push(req.body);
    fs.writeFileSync('./db.json',JSON.stringify(data))
    res.send('Data added')
})



app.listen('8090',()=>{
    console.log('Running on localhost port number 8090')
})