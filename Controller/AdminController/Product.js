const category = require('../../models/Admin/Category');

const brand = require('../../Models/Admin/brand');

const type = require('../../Models/Admin/type');

const product = require('../../Models/Admin/product')

module.exports.productpage = async (req, res) => {

    let cate = await category.find({});

    return res.render('Admin/Product',
        {
            catdata: cate,
        });
}
const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
})

module.exports.getBrandType = async (req, res) => {

    let catId = req.body.categoryId
    let subId = req.body.subCategoryId
    let extraId = req.body.extraCategoryId

    // console.log(extraId);

    let brandData = await brand.find({ categoryId: catId, subcategoryId: subId, extraCategoryId: extraId });
    let typeData = await type.find({ categoryId: catId, subcategoryId: subId, extraCategoryId: extraId });

    // console.log(brandData);
    // console.log(typeData);

    return res.render('Admin/brandtype', {
        'brandData': brandData,
        'typeData': typeData,
    })
}

module.exports.inserproduct = async (req, res) => {
    // console.log(req.files);
    let singelImgPath = '';
    if (req.files.avatar) {
        singelImgPath = product.singleImg + '/' + req.files.avatar[0].filename;
    }
    multipleImgPath = [];
    if (req.files.multipleImage) {
        for (let i = 0; i < req.files.multipleImage.length; i++) {
            multipleImgPath.push(product.mulltipalImg + '/' + req.files.multipleImage[i].filename)
        }
    }
    req.body.avatar = singelImgPath;
    req.body.multipleImage = multipleImgPath;
    req.body.isActive = true;
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;
    let productdata = await product.create(req.body);
    if (productdata) {
        return res.redirect('back');
    }
    else {
        return res.redirect('back');
    }



}