const express = require('express');

const routes =  express.Router();

const passport = require('passport');

const Admin = require('../../Models/Admin/Admin')

const admin = require('../../Controller/AdminController/Admin');
const { route } = require('./gallery');

routes.get('/deactive/:id', admin.deActive);

routes.get('/Active/:id', admin.Active);

routes.get('/', admin.login);

routes.get('/logout', async (req, res) => {

    req.logOut(function (err) {
        if (err) {
            console.log(err);
        }
    })
    return res.redirect('/');

})

routes.get('/viewsdata',admin.showdata);

routes.post('/logincheck', passport.authenticate('admin-local', { failureRedirect: '/' }), admin.logincheck);

routes.get('/dashboard',passport.checkauthenticat,admin.dashboard);

routes.get('/AddData',passport.checkauthenticat,admin.AddData);

routes.post('/insertdata',passport.checkauthenticat, Admin.uploadedAvatar, admin.insertdata);

routes.use('/gallery', require('./gallery'));

routes.use('/Extracategory',require('./ExtraCategory'));

routes.use('/brand',require('./brand'));

routes.use('/type',require('./type'));

routes.use('/Product',require('./Product'))

routes.get('/forgotpass',async (req,res)=>{
    res.render('Admin/forgotpass');
});

routes.post('/checkMail', admin.checkMail);

routes.post('/checkotp', admin.checkotp);

routes.get('/otp', admin.otp);

routes.get('/resetPassword' , admin.resetPassword);

routes.post('/changepassword', admin.changepssword);

module.exports = routes