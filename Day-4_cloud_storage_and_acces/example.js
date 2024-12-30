const mongoose = require('mongoose');

// creating Schema structure of document or refrence 
const StudentSchema = mongoose.Schema({
    name:String,
    age:Number,
    city:String,
})

// creating a collection 

const StudentModel = mongoose.model('students',StudentSchema)


// create a connection 
const connection = async ()=>{
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/college')
        console.log('Conected to db')
        await StudentModel.insertMany([{'name':'Sairam','age':21,'city':'Machilipatnam','dob':Date.now()}])
        
    } catch (error) {
        console.log(error)
        console.log('Error while connecting to db')
    }
}

connection();