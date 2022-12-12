const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const authService = require('../model/authService');
const registerSchema = require('../schemas/register')

const ajv = new Ajv();
//Format cho schema
addFormats(ajv);

let isLoggedAdmin = async (req, res, next) => {
    if (req.isAuthenticated() && req.session.passport.user.admin == '1') {
        return next();
    } else {
        return res.send('Bạn không có quyền truy cập');
    }
}
let isLoggedCustomer = async (req, res, next) => {
    if (req.isAuthenticated() && req.session.passport.user.admin == '0') {
        return next();
    } else if (req.isUnauthenticated()) {
        return next();
    }
    else
        return res.send("Bạn đang là Admin trang web");
}
let handleRegister = async (req, res) => {
    // syntax validation
    console.log(req.body)
    if (!ajv.validate(registerSchema, req.body)) {
        req.flash('registerMessage', 'Đăng ký thất bại')
        return res.redirect('/');
    }
    const { username, email, password, confirmPassword } = req.body;
    // if(!username || !email || !password || confirmPassword)
    //     return;
    if (password !== confirmPassword) {
        req.flash('registerMessage', 'Mật khẩu không trùng')
        return res.redirect('/');
    }
    if (password.length < 6) {
        req.flash('registerMessage', 'Mật khẩu phải có ít nhất 6 ký tự ')
        return res.redirect('/');
    }
    if (username.length < 6) {
        req.flash('registerMessage', 'Username phải có ít nhất 6 ký tự ')
        return res.redirect('/');
    }
    
    console.log("register");

    await authService.register(username, email, password);
    console.log("register2");


    res.redirect('/');
    return res.render('home.ejs');
}
let logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.session.destroy();
        res.redirect('/');
    });
};


module.exports = {
    handleRegister,
    logout,
    isLoggedAdmin,
    isLoggedCustomer
}