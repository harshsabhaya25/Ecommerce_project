const mongoose = require('mongoose');
const path = require('path');
const singleImg = '/uploads/singleImg';
const mulltipalImg = '/uploads/mulltipalImg';
const multer = require('multer');

const product = mongoose.Schema({

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },

    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    },

    extraCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'extraCategory'
    },
    brandId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'brand'
    },
    typeId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'type'
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    oldPrice: {
        type: Number,
        require: true,
    },
    rating: {
        type: String,
        require: true
    },
    color: {
        type: Array,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        required: true,
    },
    multipleImage: {
        type: Array,
        required: true
    },
    isActive: {
        type: Boolean,
        require: true
    },
    createdAt: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
        required: true
    }

});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname == 'avatar') {
            cb(null, path.join(__dirname, '../..', singleImg))
        }
        else {
            cb(null, path.join(__dirname, '../..', mulltipalImg))
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

product.statics.uploadedAvatar = multer({ storage: storage }).fields([{ name: 'avatar', maxCount: 1 }, { name: 'multipleImage', maxCount: 5 }])
product.statics.singleImg = singleImg;
product.statics.mulltipalImg = mulltipalImg;

const productdata = mongoose.model('product', product)
module.exports = productdata