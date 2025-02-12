const express = require('express');
const { bookModel } = require('../models/BookModel');
const { authentication } = require('../middlewares/authmiddleware');
const bookRouter = express.Router();


bookRouter.post('/createbook', authentication ,async (req,res)=>{
    try {
        const newBook = new bookModel(req.body)
        await newBook.save()
        res.send('Book created')
    } catch (error) {
        res.send(error)
    }
});


bookRouter.get('/books',authentication, async(req,res)=>{
    try {
       const books = await bookModel.find({ownerID:req.body.ownerID});
       res.send(books)
    } catch (error) {
        res.send({'error':error.messgae})
        
    }
});



bookRouter.get('/books/:id',authentication,async(req,res)=>{
    try {

        const book = await bookModel.find({_id:req.params.id,ownerID:req.body.ownerID});
        res.status(200).send(book)
        
    } catch (error) {
        res.send({'error':error.messgae})
    }
});


bookRouter.patch('/books/:id',authentication,async(req,res)=>{
    const payload = req.body;
    const id = req.params.id;
    console.log(payload)
    try {
        const book = await bookModel.findOne({_id:id});
        console.log(book)
        const ownerID = req.body.ownerID;
        if(ownerID !== book.ownerID){
            res.status(200).send('you are not authrized')
        }else{
            await bookModel.findByIdAndUpdate({_id:id},payload)
            res.status(200).send('book updated')
        }
    } catch (error) {
        res.send({'error':error.messgae})
    }
});


bookRouter.delete('/books/:id',authentication,async(req,res)=>{
    const id = req.params.id
    try {
        const book = await bookModel.findOne({_id:id});
        const ownerID = req.body.ownerID;
        if(ownerID !==book.ownerID){
            res.status(200).send('you are not authrized')
        }else{
            await bookModel.findByIdAndDelete({_id:id})
            res.status(200).send('book Deleted')
        }
    } catch (error) {
        res.send({'error':error.messgae})
    }
});





module.exports = {
    bookRouter
}


