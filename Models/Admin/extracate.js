const mongoose = require('mongoose');
const path = require('path');

const extraCategorySchema = mongoose.Schema({

    Extracategory_name: {
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




const extraCategory = mongoose.model('extraCategory', extraCategorySchema)
module.exports = extraCategory