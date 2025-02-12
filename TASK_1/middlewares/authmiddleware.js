const jwt = require('jsonwebtoken');

const authentication = (req,res,next) =>{
    const authorization = req.headers.authorization;
    if(authorization){
        const token = req.headers.authorization.split(' ')[1]
        try {
            jwt.verify(token,'sai',(error,decoded)=>{
                if(decoded){
                    req.body.ownerID = decoded.user_id;
                    req.body.owner = decoded.username;
                    next()
                }else{
                    res.status(400).send({'error':error.message})
                }
            })
        } catch (error) {
            console.log(error)
            res.status(500).send(error.message)
        }
    }else{
        res.status(500).send({message:'please login'})
    }
}

module.exports ={
    authentication
};