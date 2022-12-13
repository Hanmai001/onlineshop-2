import express from "express";
import adminControllers from '../controllers/adminControllers';
import authController from '../controllers/authController';
const router = express.Router();

const initAdminRoute = (app) => {
    router.get('/static', authController.isLoggedAdmin, adminControllers.getHomePage);
    router.get('/adminProfile/:id', authController.isLoggedAdmin, adminControllers.getAdminProfile);
    router.get('/OdersManage', authController.isLoggedAdmin, adminControllers.getOdersManage);
    router.get('/UsersManage', authController.isLoggedAdmin, adminControllers.getUsersManage);
    router.get('/OriginManage', authController.isLoggedAdmin, adminControllers.getOriginManage);
    router.get('/ProductManage', authController.isLoggedAdmin, adminControllers.getProductManage);
    router.get('/changePassword/:id', authController.isLoggedAdmin, adminControllers.getChangePassword)
    router.get('/TypeManage', authController.isLoggedAdmin, adminControllers.getTypeManage);
    router.post('/adminProfile/:id/update-info', adminControllers.updateInformation)
    router.post('/changePassword/:id/update-password', adminControllers.updatePassword);
    return app.use('/', router)
}

export default initAdminRoute;