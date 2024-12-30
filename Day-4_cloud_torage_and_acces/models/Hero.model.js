const mongoose = require('mongoose');


const heroSchema = mongoose.Schema({
    name:{type:String,required:true},
    city:{type:String,required:true},
});

const Heromodel = mongoose.model('hero',heroSchema);

module.exports = {
    heroSchema,Heromodel
}