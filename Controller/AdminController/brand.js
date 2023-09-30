const category = require('../../models/Admin/Category');

const extraCategory = require('../../Models/Admin/extracate');

const brand = require('../../Models/Admin/brand');

const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
})

module.exports.brandpage = async (req, res) => {

    const cate = await category.find({});

    res.render('Admin/brand', {
        catdata: cate,

    })
}


module.exports.brandinsert = async (req,res) => {

    req.body.isActive = true;
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;

    let branddata = await  brand.create(req.body);
    // console.log(branddata);

    if(branddata)
    {
        return res.redirect('back');
    }
    else
    {
        return res.redirect('back');
    }
    
}

module.exports.getExtraCategory = async (req, res) => {
    let extraData = await extraCategory.find({ subcategoryId: req.body.subcategoryId });
    // console.log(extraData);
    let optionData = `<option value="">--select extracategory--</option>`;

    for(ed of extraData){
        optionData += `<option value="${ed.id}">${ed.Extracategory_name}</option>`;
    }

    return res.json(optionData);
}