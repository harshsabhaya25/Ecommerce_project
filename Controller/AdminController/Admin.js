const Admin = require('../../Models/Admin/Admin')
const nodemailer = require('nodemailer');

const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
  })

module.exports.login = async (req,res)=>{ 
    if (req.isAuthenticated()) {
        return res.redirect('/dashboard');
    }
    else {
        return res.render('Admin/login', { layout: 'login' });

    }
}

module.exports.deActive = async (req, res) => {

    let data = await Admin.findByIdAndUpdate(req.params.id, { isActive: false });
    if (data) {
        return res.redirect('back');
    }
    else {
        return res.redirect('back');
    }
}


module.exports.Active = async (req, res) => {
    let data = await Admin.findByIdAndUpdate(req.params.id, { isActive: true });
    if (data) {
        return res.redirect('back');
    }
    else {
        return res, redirect('back');
    }
}

module.exports.dashboard = async  (req,res) => {

    return res.render('Admin/AdminPanel')

}

module.exports.AddData = (req,res) => {

     return res.render('Admin/AddData');
     
}

module.exports.insertdata = async (req,res) => {
    let imagePath = '';
    if(req.file){
        imagePath = Admin.avatarPath+"/"+req.file.filename;
    }
    req.body.avatar = imagePath;
    req.body.isActive = true;
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;
    req.body.role = "Admin";
    let Admindata = await Admin.create(req.body);
    if(Admindata)
    {
        
        return res.redirect('back');
    }
    {
        
        return res.redirect('back');
    }
       
    
}

module.exports.showdata =async (req,res) => {

    let data = await Admin.find({});
    if(data)
    {
        return res.render('Admin/ViewData',{
            'record' : data,
        });
    }
    else
    {
        return res.render('Admin/ViewData');
    }


}

module.exports.logincheck = async (req, res) => {
    return res.redirect('/dashboard');
}

module.exports.otp = async (req, res) => {

    return res.render('Admin/otp');

}


module.exports.checkMail = async (req, res) => {
    let mail = await Admin.findOne({ email: req.body.email });
    if (mail) {
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "914d16b4b793bf",
                pass: "98eae3ad2dcc73"
            }
        });
        var otp = Math.ceil(Math.random() * 10000);
        res.cookie('otp', otp);
        res.cookie('mail', req.body.email);

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'raiyaniurmit@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "otp for verification", // Subject line
            text: req.body.name, // plain text body
            html: `<b>otp: ${otp}</b>`, // html body
        });
        return res.redirect('/otp');
    }
    else {
        return res.redirect('back')
    }
}

module.exports.checkotp = async (req, res) => {
    if (req.body.otp == req.cookies.otp) {
        return res.redirect('/resetpassword');
    }
    else {
        return res.redirect('back');
    }
}

module.exports.resetPassword = (req, res) => {
    return res.render('Admin/resetpassword');
}

module.exports.changepssword = async (req, res) => {
    if (req.body.npassword == req.body.cpassword) {
        let email = await Admin.findOne({ email: req.cookies.mail });
        // console.log(email);
        if (email) {
            let data = await Admin.findById(email.id);
            if (data) {

                let cp = await Admin.findByIdAndUpdate(data.id, { password: req.body.npassword });

                if (cp) {
                    return res.redirect('/');

                }
                else {
                    return res.redirect('back');
                }
            }
            else {
                return res.redirect('back');
            }
        }
        else {
            return res.redirect('back');
        }
    }
    else {
        return res.redirect('back');
    }
}