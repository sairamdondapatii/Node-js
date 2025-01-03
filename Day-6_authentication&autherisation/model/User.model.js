const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number || 0
},{
    versionKey: false
});


const UserModel = mongoose.model('User',UserSchema);

module.exports = {
    UserModel,UserSchema
}