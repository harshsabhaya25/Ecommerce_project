const express = require('express');

const routes = express.Router();

const passport = require('passport');

const gallery = require('../../Controller/AdminController/Gallery');
const Category = require('../../models/Admin/Category');
const Subcategory = require('../../models/Admin/SubCategory');


routes.get('/Add_Category',passport.checkauthenticat, gallery.addcategory);

routes.post('/insertCategory', Category.uploadedAvatar, gallery.insertCategory);

routes.get('/AddSub',passport.checkauthenticat, gallery.AddSub)

routes.post('/insertSubCategory',Subcategory.uploadedAvatar , gallery.insertSubCategory);

routes.get('/view_category',passport.checkauthenticat, gallery.view_category);

routes.get('/deactive/:id', gallery.deActive);

routes.get('/Active/:id', gallery.Active);

module.exports = routes;