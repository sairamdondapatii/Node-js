const express = require('express')
const {Heromodel} = require('../../models/Hero.model')


const heroRouter = express.Router()
// hero collection 
heroRouter.post('/createhero',async (req,res)=>{
    try {
        const user = new Heromodel(req.body)
        await user.save();
    } catch (error) {
        console.log(error)
        
    }
    // console.log(data)
    res.json({'message':'hero created'})
});


heroRouter.get('/',async (req,res)=>{
    try {
        const users = await Heromodel.find()
        res.send(users)
        
    } catch (error) {
        console.log(error)
    }
})


module.exports = {heroRouter}