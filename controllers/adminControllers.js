const adminService = require('../model/adminService')

let getHomePage = (req, res) => {
    return res.render('index.ejs')
}
let getAdminProfile = (req, res) => {
    return res.render('adminProfile.ejs')
}
let getOdersManage = (req, res) => {
    return res.render('OdersManage.ejs')
}
let getUsersManage = (req, res) => {
    return res.render('UsersManage.ejs')
}
let getOriginManage = (req, res) => {
    return res.render('OriginManage.ejs')
}
let getProductManage = (req, res) => {
    return res.render('ProductManage.ejs')
}
let getTypeManage = (req, res) => {
    return res.render('TypeManage.ejs')
}
let updateInformation = async (req, res) => {
    const {
        updateAva: ava,
        updateFullname: fullname,
        updateEmail: email,
        updatePhone: phone,
        updateSex: sex
    } = req.body;

    const idUser = req.params.id;
    if (phone.length > 11) {
        req.flash('updateProfileMsg', 'SĐT phải nhỏ hơn 12 kí tự.');
        return res.redirect(`/adminProfile/${idUser}`);
    }

    const result = await adminService.updateProfile(req.body, idUser);
    //console.log(res.locals.user);
    if (result) {
        if (ava)
            res.locals.user.ava = ava;
        if (fullname)
            res.locals.user.fullname = fullname;
        if (email)
            res.locals.user.email = email;
        if (phone)
            res.locals.user.phone = phone;
        if (sex && sex === "female")
            res.locals.user.sex = 'Nữ';
        else if (sex && sex === "male")
            res.locals.user.sex = 'Nam';
        else if (sex && sex === "sexOther")
            res.locals.user.sex = 'Khác';
        return res.redirect(`/adminProfile/${idUser}`);
    }
    req.flash('updateProfileMsg', 'Kiểm tra lại thông tin cập nhật.');
    return res.redirect(`/adminProfile/${idUser}`);

}
module.exports = {
    getHomePage,
    getAdminProfile,
    getOdersManage,
    getUsersManage,
    getOriginManage,
    getProductManage,
    getTypeManage,
    updateInformation
}