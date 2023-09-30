const mongoose = require('mongoose');
const AVATAR_PATH = '/uploads/Category';
const path = require('path');
const multer = require('multer');

const CategorySchema = mongoose.Schema({

    category_name: {
        type: String,
        required: true
    },
    category_img: {
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

CategorySchema.statics.uploadedAvatar = multer({ storage: storage }).single('category_img');
CategorySchema.statics.avatarPath = AVATAR_PATH;

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category;