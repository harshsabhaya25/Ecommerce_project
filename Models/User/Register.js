const mongoose = require('mongoose');

const path = require('path');

const RegisterSchema = mongoose.Schema({

    Name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    
    password:{
        type:String,
        require:true
    },
    role:{
        type : String,
        required : true,
        default:'User'
    },
    createdAt : {
        type : String,
        required : true
    },
    isActive:{
        type:Boolean,
        require:true
    },
    updatedAt : {
        type : String,
        required : true
    }

});

const Registerdata = mongoose.model('Register', RegisterSchema);
module.exports = Registerdata
