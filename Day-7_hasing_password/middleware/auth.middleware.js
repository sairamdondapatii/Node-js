const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1];
    if(token){
        try {
            jwt.verify(token, 'shhhhh', (error,decoded)=>{
            if(decoded){
                next()
            }else{
                res.status(400).send({'error':error.message})
            }
            })
        } catch (error) {
            console.log(error)
            res.status(400).send({'error':error.message})
        }

    }else{
        res.status(400).send({'message':'please login'})
    }

}

module.exports = {
    auth
}