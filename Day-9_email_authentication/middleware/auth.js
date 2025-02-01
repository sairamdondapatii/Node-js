const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../model/blacklistModel");

const auth = async (req,res,next)=>{
    try {
        
        console.log(req.cookies);
        const {accessToken} = req.cookies;

        const isTokenBlacklisted = await BlacklistModel.findOne({
            blacklist:accessToken,
        })
        console.log(isTokenBlacklisted)
        if(isTokenBlacklisted){
            return res.status(400).send({message:'Please login okay'});
        }

        jwt.verify(accessToken,'accesstoken',async(error,decoded)=>{
            if(error){
                if(error.message === 'jwt must be provided'){
                    const newAccessToken = await fetch('http://localhost:8090/auth/refresh-token',{
                        headers:{
                            'Content-Type':'applicatiob/json',
                            Authrization:req.cookies.accessToken
                        }
                    }).then(res => res.json());
                    res.cookie('accessToken',newAccessToken,{maxAge:1000*60});
                    next()
                }
            } else{

                console.log('decoded',decoded)
                req.body.email = decoded.email;
                next()
            }
        })


    } catch (error) {
        res.status(500).send({ message: error.message, testing: "testing" }); 
    }
}


module.exports = {
    auth
}