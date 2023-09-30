const Admin = require('../../Models/Admin/Admin');
const Category = require('../../models/Admin/Category');
const SubCategory = require('../../models/Admin/SubCategory')

module.exports.addcategory = async (req, res) => {
    return res.render('Admin/Add_Category')
}
const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
})

module.exports.insertCategory = async (req, res) => {
    let imgPath = '';
    if (req.file) {
        imgPath = Category.avatarPath + '/' + req.file.filename
    }
    req.body.isActive = true;
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate; 
    req.body.category_img = imgPath;
    let data = await Category.create(req.body);
    if (data) {
        return res.redirect('back');
    } else {
        return res.redirect('back');
    }
}

module.exports.AddSub = async (req, res) => {

    let cat = await Category.find({isActive:true});
    return res.render('Admin/AddSub', {
        catdata: cat
    });
}

module.exports.insertSubCategory = async (req, res) => {

    let imgPath = '';
    if (req.file) {
        imgPath = SubCategory.avatarPath + '/' + req.file.filename
    }
    req.body.Subcategory_img = imgPath;
    req.body.isActive = true;
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;

    let subcat = await SubCategory.create(req.body);
    if (subcat) {
        return res.redirect('back')
    }
    else {
        console.log('data is not insert');
        return res.redirect('back')
    }

}

module.exports.view_category = async (req,res) =>{
    let categoryData = await Category.find({});
    if(categoryData){
        return res.render('Admin/view_category',{
            'catData' : categoryData
        })
    }
    else{
       
        categoryData = "null data";
        return res.render('Admin/view_category',{
            'catData' : categoryData
        })
    }
};

module.exports.deActive = async (req, res) => {
    let data = await Category.findByIdAndUpdate(req.params.id, { isActive: false });
    if (data) {
        return res.redirect('back');
    }
    else {
        return res.redirect('back');
    }
}



module.exports.Active = async (req, res) => {
    let data = await Category.findByIdAndUpdate(req.params.id, { isActive: true });
    if (data) {
        return res.redirect('back');
    }
    else {
        return res, redirect('back');
    }
}