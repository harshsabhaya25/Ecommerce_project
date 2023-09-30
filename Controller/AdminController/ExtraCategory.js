const category = require('../../models/Admin/Category');
const subcategory = require('../../models/Admin/SubCategory');
const extraCategory  = require('../../Models/Admin/extracate')

const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
});

module.exports.Add_ExtraCategory = async (req, res) => {

    const cate = await category.find({});
    return res.render('Admin/AddExtraCte', {
        catdata: cate
    });
}

module.exports.insertextracate = async (req,res) => {
    
    req.body.isActive = true;
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;

    // console.log(req.body);

    const extra = await extraCategory.create(req.body);

    if(extra)
    {
        return res.redirect('back');
    }
    else
    {
        return res.redirect('back');
    }


}

module.exports.getSubData = async (req, res) => {
    let subdata = await subcategory.find({ categoryId : req.body.categoryId });
    var optionData = `<option value="">--select subcategory--</option>`;
    for (var sd of subdata) {
        optionData += `<option value="${sd.id}">${sd.Subcategory_name}</option>`;
    }
    return res.json(optionData)
}