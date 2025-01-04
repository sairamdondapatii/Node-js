const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:String,
    email:{ type: String, required: true},
    password:String,
    age:{ type: Number, default: 0 }
},{
    versionKey: false
});


const UserModel = mongoose.model('User',UserSchema);

module.exports = {
    UserModel,UserSchema
}