const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name:String,
    email:String,
    purchaseByProducts:[{type:mongoose.Schema.Types.ObjectId,ref:'Product'}]
    
})
const ProductSchema = new mongoose.Schema({
    name:String,
    price:Number,
    purchaseByCustomers:[{type:mongoose.Schema.Types.ObjectId,ref:'Customer'}]
})


const customerModel = mongoose.model('Customer',CustomerSchema);

const productModel = mongoose.model('Product',ProductSchema);



module.exports = {customerModel,productModel }