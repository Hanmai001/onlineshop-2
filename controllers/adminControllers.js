
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

module.exports = {
    getHomePage,
    getAdminProfile,
    getOdersManage,
    getUsersManage,
    getOriginManage,
    getProductManage,
    getTypeManage
}