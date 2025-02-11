const express = require('express');
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(express.json());

const httpServer = http.createServer(app);

const io = new Server(httpServer)

app.get('/', (req,res)=>{
    res.send('welcome port number 8090')
})

let count = 0;
io.on("connection", (socket) => {
    count++;
    io.emit('newUser',count);
    
    socket.on('message',(sai)=>{
        console.log('message',sai)
        // only reciver can view msgs
        // socket.broadcast.emit('usermsg',sai)
        // reciver and sender both can view mesgs
        io.emit('usermsg',sai)
    });


    socket.on('disconnect',()=>{
        count--;
        io.emit('newUser',count);
    })
  });


httpServer.listen(8090,()=>{
    console.log('server running at http://localhost:8090');
});

