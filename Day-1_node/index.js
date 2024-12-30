const http = require('http');
const fs = require('fs');


const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.setHeader('Content-Type','text/html')
        res.end('<h1>Sai ram Dondapati</h1>')
    }
    else if(req.url === '/data'){
        fs.readFile('./text.txt','utf8',(err,data)=>{
            if(err){
                res.write('no dtaa');
                res.end(err);
            }
            else{
                res.end(data)
            }
        })
    }
    else if(req.url === '/adddata' && req.method === 'POST'){
        let str ='';
        req.on('data',(chunk)=>{
            str += chunk;
        });
        req.on('end',()=>{
            console.log(str)
        })
        res.end('Data has been recorded')
    }
    else{
        res.end('no end point match')
    }
})



server.listen('8090',()=>{
    console.log('Running on port 8090')
})