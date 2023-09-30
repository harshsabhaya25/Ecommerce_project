const express = require('express');

const routes = express.Router();

const passport = require('passport');

const ExtraCategory = require('../../Controller/AdminController/ExtraCategory');

routes.get('/', ExtraCategory.Add_ExtraCategory);

routes.post('/insertextracate',passport.checkauthenticat, ExtraCategory.insertextracate)

routes.post("/getsubcategory",passport.checkauthenticat, ExtraCategory.getSubData);

module.exports = routes;