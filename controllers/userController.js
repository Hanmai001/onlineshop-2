const productService = require('../model/productService');
const userService = require('../model/userService');
const authService = require('../model/authService');

let getHomepage = async (req, res) => {
    let products;
    const allProducts = await productService.getAllProduct();
    const {
        name: nameFilter,
        type: typeFilter,
        brand: brandFilter,
        manufacturer: manufacturerFilter,
        priceFrom: priceFrom,
        priceTo: priceTo,
        numBuy: numBuy,
        sortPrice: sortPrice,
        timeCreate: timeCreate,
        sort: sortFilter
    } = req.query;
    if (nameFilter || typeFilter || manufacturerFilter || brandFilter || priceFrom || priceTo || numBuy || sortPrice || timeCreate || sortFilter)
        products = await productService.getFilterProduct(req.query);
    else
        products = allProducts;
    const brands = await productService.getAllBrand();
    const manufacturers = await productService.getAllManufacturer();
    const types = await productService.getAllType();
    let random_names = [];
    let length = allProducts.length;
    for (let i = 0; i < 6; i++) {
        let num = Math.floor(Math.random() * length);
        let check = true;
        for (let j = 0; j < random_names.length; j++) {
            if (random_names[j] && random_names[j] === allProducts[num].NAMEPRODUCT) {
                check = false
            }

        }
        if (check || random_names.length < 1) {
            random_names.push(allProducts[num].NAMEPRODUCT)
        }
        else i--
    }
    // console.log(random_names)
    return res.render('home.ejs', { products: products, brands: brands, types: types, manufacturers: manufacturers, names: random_names });
}
let getDetailProductPage = async (req, res) => {
    let id = req.params.id;

    const product = await productService.getDetailProduct(id);
    const relateProducts = await productService.getRelatedProducts(id);
    const review = await productService.getReview(id);

    return res.render('product-info.ejs', { product: product, relateProducts: relateProducts, review: review });
}
let getListOrderPage = async (req, res) => {
    return res.render('list-order.ejs');
}
let getProfilePage = async (req, res) => {

    return res.render('my-profile.ejs');
}
let updateInformation = async (req, res) => {
    const idUser = req.params.id;
    let ava = res.locals.user.ava;
    if (req.file) {
        ava = '/images/' + req.file.filename;
    }
    const {
        updateFullname: fullname,
        updateEmail: email,
        updatePhone: phone,
        updateSex: sex
    } = req.body;
    
    //console.log(req.body)
   
    if (phone.length > 11) {
        req.flash('updateProfileMsg', 'S??T ph???i nh??? h??n 12 k?? t???.');
        return res.redirect(`/my-profile/${idUser}`);
    }

    const result = await userService.updateProfile(req.body, ava, idUser);
    //console.log(res.locals.user);
    if (result) {
        if (req.file && ava)
            res.locals.user.ava = ava;
        if (fullname)
            res.locals.user.fullname = fullname;
        if (email)
            res.locals.user.email = email;
        if (phone)
            res.locals.user.phone = phone;
        if (sex && sex === "female")
            res.locals.user.sex = 'N???';
        else if (sex && sex === "male")
            res.locals.user.sex = 'Nam';
        else if (sex && sex === "sexOther")
            res.locals.user.sex = 'Kh??c';
        return res.redirect(`/my-profile/${idUser}`);
    }
    req.flash('updateProfileMsg', 'Ki???m tra l???i th??ng tin c???p nh???t.');
    return res.redirect(`/my-profile/${idUser}`);
}
let getUpdatePasswordPage = async (req, res) => {
    return res.render('change-password.ejs')

}
let updatePassword = async (req, res) => {
    const {
        curPass,
        newPass,
        confPass
    } = req.body;
    const idUser = req.params.id;
    if (!curPass || !newPass || !confPass) {
        req.flash('updatePassMsg', 'Vui l??ng nh???p ????? th??ng tin.');
        return res.redirect(`/change-password/${idUser}`);
    }
    if (curPass.length < 6 || newPass.length < 6 || confPass.length < 6) {
        req.flash('updatePassMsg', 'M???t kh???u ph???i ??t nh???t 6 k?? t???.');
        return res.redirect(`/change-password/${idUser}`);
    }
    if (newPass !== confPass) {
        req.flash('updatePassMsg', 'X??c nh???n m???t kh???u kh??ng tr??ng.');
        return res.redirect(`/change-password/${idUser}`);
    }
    console.log(res.locals.user.username);
    if (!await authService.checkUserCredential(res.locals.user.username, curPass)) {
        //console.log("sai mk");
        req.flash('updatePassMsg', 'Nh???p sai m???t kh???u hi???n t???i.');
        return res.redirect(`/change-password/${idUser}`);
    }
    const result = await userService.updatePassword(req.body, idUser);
    if (result) {
        req.flash('updatePassMsg', '?????i m???t kh???u th??nh c??ng.');
        return res.redirect(`/change-password/${idUser}`);
    }
    req.flash('updatePassMsg', '?????i m???t kh???u th???t b???i.');
    return res.redirect(`/change-password/${idUser}`);
}

let getListOrderStatusPage = async (req, res) => {
    return res.render('status-orders.ejs')
}

let getPaymentPage = async (req, res) => {
    return res.render('payment.ejs');
}
module.exports = {
    getHomepage,
    getDetailProductPage,
    getListOrderPage,
    getProfilePage,
    getUpdatePasswordPage,
    getListOrderStatusPage,
    getPaymentPage,
    updateInformation,
    updatePassword,

}