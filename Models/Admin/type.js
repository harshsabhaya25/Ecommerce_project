const mongoose = require('mongoose');
const path = require('path');

const typeSchema = mongoose.Schema({

    typeName: {
        type: String,
        required: true
    },
    categoryId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
    },
    subcategoryId: {
        type : mongoose.Schema.Types.ObjectId,
        ref:'SubCategory',
    },
    extraCategoryId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'extraCategory'
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


const type = mongoose.model('type',typeSchema);
module.exports = type