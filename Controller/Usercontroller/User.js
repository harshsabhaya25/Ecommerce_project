const category = require('../../models/Admin/Category');
const subcategory = require('../../models/Admin/SubCategory');
const extracategory = require('../../Models/Admin/extracate');
const product = require('../../Models/Admin/product');
const brand = require('../../Models/Admin/brand');
const Register = require('../../Models/User/Register');
const Cart = require('../../Models/User/Cart')
const { check, validationResult } = require('express-validator')
const stripe = require('stripe')("sk_test_51NJfTxSFSSMzpDICr86LzRVhtqcflH8w3bJap0Q6jx78hFOOql6GH13upgANeFxqr1hPiP396uZvKx5TsyjVfILf00Pen5YHeN")

const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
})

module.exports.userpage = async (req, res) => {

    const cat = await category.find({});
    const sub = await subcategory.find({ isActive: true });
    const extra = await extracategory.find({ isActive: true });

    // console.log(extra);
    var cartData = 0;

    if (req.user) {
        let userCartCount = await Cart.find({ user_id: req.user.id }).countDocuments();
        req.session.cartData = userCartCount;
        cartData = req.session.cartData;
    }
    res.render('User/home', {
        catdata: cat,
        subdata: sub,
        extradata: extra,
        cartData: cartData,

    });
}

module.exports.addShope = async (req, res) => {

    let catId = req.params.id;
    let subId = req.params.subId;
    let extraId = req.params.extraId;

    // console.log(req.params);

    let productData = await product.find({ categoryId: catId, subcategoryId: subId, extraCategoryId: extraId })
    // console.log(productData);
    let categoryData = await category.find({})
    let subCategoryData = await subcategory.find({ isActive: true })
    let extraCatgoryData = await extracategory.find({ isActive: true })
    let brandData = await brand.find({})
    // console.log(brandData)
    var cartData = 0;
    if (req.user) {
        cartData = req.session.cartData;
    }
    return res.render('User/shope', {
        'catdata': categoryData,
        'subdata': subCategoryData,
        'extradata': extraCatgoryData,
        'brandData': brandData,
        'productData': productData,
        'cartData': cartData,

    })


}

module.exports.findBrandWisedata = async (req, res) => {
    const productData = await product.find({ 'brandId': req.body.brandIds })

    return res.render('user/brandFilter', {
        'productData': productData
    })
}

module.exports.viewproduct = async (req, res) => {

    // let catId = req.params.id;
    // let subId = req.params.subId;
    // let extraId = req.params.extraId;

    const productData = await product.findById(req.params.id)
    // console.log(productData);
    const cat = await category.find({});
    const sub = await subcategory.find({ isActive: true });
    const extra = await extracategory.find({ isActive: true });

    var cartData = 0;
    if (req.user) {
        cartData = req.session.cartData;
    }
    res.render('User/viewproduct', {
        catdata: cat,
        subdata: sub,
        extradata: extra,
        productData: productData,
        cartData: cartData,
    });

}

module.exports.register = async (req, res) => {

    const cat = await category.find({});
    const sub = await subcategory.find({ isActive: true });
    const extra = await extracategory.find({ isActive: true });

    // console.log(extra);
    var cartData = 0;
    if (req.user) {
        cartData = req.session.cartData;
    }
    res.render('User/Register', {
        catdata: cat,
        subdata: sub,
        extradata: extra,
        cartData: cartData,
    });
}

module.exports.Register = async (req, res) => {

    req.body.isActive = true;
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;

    var cartData = 0;
    if (req.user) {
        cartData = req.session.cartData;
    }
    let Registerdata = await Register.create(req.body);
    // console.log(Registerdata);

    return res.render('User/UserLogin');

}

module.exports.UserLogin = async (req, res) => {
    const cat = await category.find({});
    const sub = await subcategory.find({ isActive: true });
    const extra = await extracategory.find({ isActive: true });

    // console.log(extra);
    var cartData = 0;

    if (req.user) {
        let userCartCount = await Cart.find({ user_id: req.user.id }).countDocuments();
        req.session.cartData = userCartCount;
        cartData = req.session.cartData;
    }
    res.render('User/UserLogin', {
        catdata: cat,
        subdata: sub,
        extradata: extra,
        cartData: cartData,
    });
}

module.exports.insertLogin = async (req, res) => {
    return res.redirect('/User');
}

module.exports.cart = async (req, res) => {

    const cat = await category.find({});
    const sub = await subcategory.find({ isActive: true });
    const extra = await extracategory.find({ isActive: true });

    var cartData = 0;
    if (req.user) {
        let userCartCount = await Cart.find({ user_id: req.user.id }).countDocuments();
        req.session.cartData = userCartCount;
        cartData = req.session.cartData;
    }
    else {
        return res.redirect('/User');
    }

    let cartUserData = await Cart.find({ 'user_id': req.user.id }).populate('product_id').exec()


    return res.render('User/cart', {
        catdata: cat,
        subdata: sub,
        extradata: extra,
        cartUserData: cartUserData,
        cartData: cartData
    });
}

module.exports.addToCart = async (req, res) => {

    // console.log(req.body);
    let cartData = await Cart.find({ user_id: req.body.user_id, product_id: req.body.product_id });


    if (cartData.length == 0) {

        req.body.isActive = true;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;
        req.body.order_status = "Pending";
        await Cart.create(req.body);

        let userCartCount = await Cart.find({ user_id: req.body.user_id }).countDocuments();
        req.session.cartData = userCartCount;

        return res.redirect('back');

    }
    else {

        return res.redirect('back');

    }
}


module.exports.productQuantity = async (req, res) => {
    // console.log(req.body);
    let cartQun = await Cart.findOne({ product_id: req.body.productId, user_id: req.user.id });
    // console.log(cartQun);

    if (cartQun) {
        let cartupdate = await Cart.findByIdAndUpdate(cartQun.id, {
            quantity: req.body.quantity
        });
        if (cartupdate) {
            return res.json({ msg: "quantity Updated" });
        }
        else {
            return res.json({ msg: "something wrong" });
        }
    }
}

module.exports.removeCart = async (req, res) => {
    // console.log(req.params.id);
    let rCart = await Cart.findByIdAndDelete(req.params.id);
    if (rCart) {
        // req.flash('success',"Product Remove from Cart");
        return res.redirect('back');

    }
    else {
        // req.flash('error',"Something wrong");
        return res.redirect('back');
    }
}

module.exports.paymentCartData = async (req, res) => {

    try {
        await stripe.paymentIntents.create(
            {
                amount: (req.body.FinalAmount) * 100,
                currency: "inr",
                payment_method_types: ["card"],
                receipt_email: req.user.email,
            },
            function (err, paymentIntent) {
                if (err) {
                    throw new Error("failed to charge");
                }

                res.status(200).send(paymentIntent);
            }
        );
    } catch (err) {
        console.log(err, "error occure");
    }
}