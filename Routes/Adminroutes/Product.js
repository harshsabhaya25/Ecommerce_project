const express = require('express');

const routes =  express.Router();
const passport = require('passport');
const productcontroller = require('../../Controller/AdminController/Product');

const Product = require('../../Models/Admin/product')

routes.get('/',passport.checkauthenticat,productcontroller.productpage);

routes.post('/getBrandType',passport.checkauthenticat,productcontroller.getBrandType)

routes.post ('/insertproduct',passport.checkauthenticat,Product.uploadedAvatar ,productcontroller.inserproduct)

module.exports = routes