const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name:String,
    email:String,
    orders:[{type:mongoose.Schema.Types.ObjectId,ref:'Order'}]
    
})
const OrderSchema = new mongoose.Schema({
    item:String,
    quantity:Number
})


const customerModel = mongoose.model('Customer',CustomerSchema);

const orderModel = mongoose.model('Order',OrderSchema);



module.exports = {customerModel,orderModel }