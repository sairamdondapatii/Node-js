const express = require('express');
const { NotesModel } = require('../model/Notes.model');
const { UserModel } = require('../model/User.model');

const NotesRouter = express.Router();

NotesRouter.get('/',async (req,res)=>{
    try {
        const userNotes = await UserModel.find()
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


NotesRouter.patch('/update/:noteID',(req,res)=>{
    
})


NotesRouter.delete('/delete/:noteID',(req,res)=>{
    
})


module.exports ={
    NotesRouter
}