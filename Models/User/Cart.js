const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Register",
        required : true,
    },
    product_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"product",
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    order_status:{
        type : String,
        required : true
    },
    isActive :{
        type : Boolean,
        required : true
    },
    createdAt : {
        type : String,
        required : true
    },
    updatedAt : {
        type : String,
        required : true
    }
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;