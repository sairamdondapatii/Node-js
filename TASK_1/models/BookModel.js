const mongoose = require('mongoose');

const bookSchema =  mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    genre:{type:String,required:true},
    publishedYear:{type:String,required:true},
    ownerID:{type:String,required:true},
    owner:{type:String,required:true}
},
{
    versionKey: false
});



const bookModel = mongoose.model('book',bookSchema);


module.exports = {
    bookSchema,bookModel
}