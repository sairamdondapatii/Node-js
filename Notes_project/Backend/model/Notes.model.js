const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    category:{type:String,required:true},
    authour:{type:String,required:true},
    authourID:{type:String,required:true}
},{
    versionKey: false
});


const NotesModel = mongoose.model('Notesdata',NotesSchema);

module.exports = {
    NotesModel,NotesSchema
}