const express = require('express');

const routes = express.Router();

const typecontroller = require('../../Controller/AdminController/type');
const passport = require('passport');

routes.get('/',passport.checkauthenticat, typecontroller.typepage);

routes.post('/inserttype', typecontroller.inserttype)


module.exports = routes;