const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const authService = require('../model/authService');

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