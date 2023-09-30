const express = require('express');
const routes =  express.Router();
const passport = require('passport');
const { check, validationResult } = require('express-validator')

const user = require('../../Controller/Usercontroller/User')

routes.get('/404',(req,res)=>{
    res.render('User/404')
})

routes.get('/',user.userpage);

routes.get('/shope/:id/:subId/:extraId',user.addShope);

routes.post('/findBrandWisedata',user.findBrandWisedata);

routes.get('/viewproduct/:id',user.viewproduct);

routes.get('/Register',user.register);

routes.post('/insertRegister',user.Register);

routes.get('/UserLogin',user.UserLogin);

routes.post('/insertLogin',passport.authenticate('user-local', { failureRedirect: '/' }),user.insertLogin);

routes.get ('/UserLogOut',async (req, res) => {

    req.logout(function (err) {
        if (err) {
            console.log(err);
        }
    })
    return res.redirect('/User/UserLogin');

})

routes.get('/cart', user.cart);

routes.post("/addTocart", user.addToCart);

routes.post("/productQuantity", user.productQuantity);

routes.get("/removeCart/:id", user.removeCart);

routes.post("/paymentCartData", user.paymentCartData);

module.exports = routes