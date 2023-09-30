
const mongoose = require('mongoose')

const path = require('path');


const brandCategorySchema = mongoose.Schema({

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
  
    subcategoryId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'SubCategory'
    },

    extraCategoryId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'extraCategory'
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    createdAt : {
        type : String,
        required : true
    },
    updatedAt : {
        type : String,
        required : true
    }
})


const brand = mongoose.model('brand', brandCategorySchema)

module.exports = brand;