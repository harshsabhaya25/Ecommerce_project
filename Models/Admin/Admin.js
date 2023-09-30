const mongoose = require('mongoose');
const AVATAR_PATH = '/uploads';
const path = require('path');
const multer = require('multer');

const Erecord = mongoose.Schema({
   
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        require:true
    },
    role:{
        type : String,
        required : true,
        default:'Admin'
    },
    // createdAt : {
    //     type : String,
    //     required : true
    // },
    // updatedAt : {
    //     type : String,
    //     required : true
    // }

},
{
    timestamps:true
}
);


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'../..',AVATAR_PATH))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
})

Erecord.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
Erecord.statics.avatarPath = AVATAR_PATH;

const admindata = mongoose.model('Erecord', Erecord)
module.exports = admindata