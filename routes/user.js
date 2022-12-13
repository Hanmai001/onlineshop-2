const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const passport = require('../passport');

//Khoi tao web router
const initUserRoute = (app) => {
    router.use((req, res, next) => {
        res.locals.flashMessages = req.flash();
        next();
    });
    //<=> route.get('/', (req, res) => {res.render('index.ejs)})
    router.get('/', authController.isLoggedCustomer, userController.getHomepage);
    //truyền thso vào url
    router.get('/products/details/:id', authController.isLoggedCustomer, userController.getDetailProductPage);
    router.get('/list-order', authController.isLoggedCustomer, userController.getListOrderPage);
    router.get('/my-profile/:id', authController.isLoggedCustomer, userController.getProfilePage);
    router.get('/change-password/:id', authController.isLoggedCustomer, userController.getUpdatePasswordPage);
    router.get('/list-orders-status/:id', authController.isLoggedCustomer, userController.getListOrderStatusPage);
    router.get('/payment', authController.isLoggedCustomer, userController.getPaymentPage);
    router.post('/register', authController.handleRegister);

    router.post('/login', passport.authenticate("local",
        {
            failureRedirect: "/",
        }), (req, res) => {
            if (req.user.ADMIN == '1') {
                res.redirect('/static');
            }
            else
                res.redirect('/');
        });
    router.get('/logout', authController.logout);
    router.post('/my-profile/:id/update-info', userController.updateInformation);
    router.post('/change-password/:id/update-password', userController.updatePassword);
    //Web của ta bđau = '/', truyền router vào
    return app.use('/', router);
}

//module.export = initWebRoute;
export default initUserRoute;

