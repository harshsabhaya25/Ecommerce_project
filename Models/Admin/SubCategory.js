const mongoose = require('mongoose');
const AVATAR_PATH = '/uploads/Category';
const path = require('path');
const multer = require('multer');

const SubCategorySchema = mongoose.Schema({

    Subcategory_name: {
        type: String,
        required: true
    },
    categoryId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
    },
    Subcategory_img: {
        type: String,
        required: true,
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


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../..', AVATAR_PATH))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

SubCategorySchema.statics.uploadedAvatar = multer({ storage: storage }).single('Subcategory_img');
SubCategorySchema.statics.avatarPath = AVATAR_PATH;

const SubCategory = mongoose.model('SubCategory', SubCategorySchema)
module.exports = SubCategory