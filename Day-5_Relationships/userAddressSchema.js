const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    address:{type:mongoose.Schema.Types.ObjectId,ref:'Address'}
})
const addressSchema = new mongoose.Schema({
    state:String,
    city:String,
})


const userModel = mongoose.model('User',UserSchema);

const addressModel = mongoose.model('Address',addressSchema);



module.exports = {userModel,addressModel }

