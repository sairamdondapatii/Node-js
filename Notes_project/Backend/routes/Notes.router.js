const express = require('express');
const { NotesModel } = require('../model/Notes.model');

const NotesRouter = express.Router();

// Get all notes based on user login

NotesRouter.get('/',async (req,res)=>{
    try {
        const userNotes = await NotesModel.find({authourID:req.body.authourID})
        res.status(200).send(userNotes)
    } catch (error) {
        res.status(400).json({'error':error.message})
    }

})

//To create Notes

NotesRouter.post('/create',async (req,res)=>{
    try {
        const note = new NotesModel(req.body);
        await note.save();
        res.status(200).send({message:'Notes created successfully'})
    } catch (error) {
        res.status(400).json({'error':error.message})
    }
})

// To update notes 
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
            res.status(200).send({ message: `Note with ID${noteID} has been sucessfully updated` });
        }

    } catch (error) {
        res.status(400).json({'error':error.message})
    }
})

// To delete notes
NotesRouter.delete('/delete/:noteID',async (req,res)=>{
    const noteID = req.params.noteID;
    const note = await NotesModel.findOne({_id:noteID});
    const userID = req.body.authourID;
    try {
        if(note.authourID !== userID){
            res.send({ message: "you are not authorized" });
        }else{
            await NotesModel.findByIdAndDelete({_id:noteID});
            res.status(200).send({ message: `Note ${note.title} has been deleted` });
        }

    } catch (error) {
        res.status(400).json({'error':error.message})
    }
})


module.exports ={
    NotesRouter
}