const express = require('express');

const routes = express.Router();
const passport = require('passport');

const brandcont = require('../../Controller/AdminController/brand')

routes.get('/',brandcont.brandpage);

routes.post('/insertextrabrand',passport.checkauthenticat,brandcont.brandinsert)

routes.post('/getExtraCategory',passport.checkauthenticat,brandcont.getExtraCategory)

module.exports = routes;