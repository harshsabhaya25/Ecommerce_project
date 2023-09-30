const category = require('../../models/Admin/Category');
const type = require('../../Models/Admin/type');


const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
});


module.exports.typepage = async (req,res)=>{

    const cate = await category.find({});
    return res.render('Admin/type',
    {
        catdata: cate,
    });
}

module.exports.inserttype = async (req,res) => {

    req.body.isActive = true;
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;
    
    let typedata = await type.create(req.body);

    if(typedata)
    {
        return res.redirect('back')
    }
    else
    {
        return res.redirect('back')
    }

}