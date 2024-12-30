const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    city:{type:String,required:true},
});

const UserModel = mongoose.model('users',userSchema);

module.exports = {
    userSchema,UserModel
}