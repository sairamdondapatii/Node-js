const express = require('express');
const { NotesModel } = require('../model/Notes.model');

const NotesRouter = express.Router();

NotesRouter.get('/',async (req,res)=>{
    try {
        const userNotes = await NotesModel.find({authourID:req.body.authourID})
        res.status(200).send(userNotes)
    } catch (error) {
        res.status(400).json({'error':error.message})
    }

})

NotesRouter.post('/create',async (req,res)=>{
    try {
        const note = new NotesModel(req.body);
        await note.save();
        res.status(200).send({message:'Notes created successfully'})
    } catch (error) {
        res.status(400).json({'error':error.message})
    }
})


NotesRouter.patch('/update/:noteID',async(req,res)=>{
    const noteID = req.params.noteID;
    const payload = req.body;
    const note = await NotesModel.findOne({_id:noteID});
    const userID = req.body.authourID;
    try {
        if(note.authourID !== userID){
            res.send({ message: "you are not authorized" });
        }else{
            await NotesModel.findByIdAndUpdate({_id:noteID},payload);
            res.status(200).send({ message: `the note with ID${noteID} has been updated` });
        }

    } catch (error) {
        res.status(400).json({'error':error.message})
    }
})


NotesRouter.delete('/delete/:noteID',async (req,res)=>{
    const noteID = req.params.noteID;
    const note = await NotesModel.findOne({_id:noteID});
    const userID = req.body.authourID;
    try {
        if(note.authourID !== userID){
            res.send({ message: "you are not authorized" });
        }else{
            await NotesModel.findByIdAndDelete({_id:noteID});
            res.status(200).send({ message: `the note with ID${note.title} has been deleted` });
        }

    } catch (error) {
        res.status(400).json({'error':error.message})
    }
})


module.exports ={
    NotesRouter
}