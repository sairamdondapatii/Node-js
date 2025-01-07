const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const authorization = req.headers.authorization;
    // const token = req.query.token;
    if(authorization){
        const token = req.headers.authorization.split(' ')[1]
        try {
            jwt.verify(token, 'shhhhh', (error,decoded)=>{
            if(decoded){
                req.body.authourID = decoded.authourID;
                req.body.authour = decoded.authour;
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