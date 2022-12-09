import express from "express";
import adminControllers from '../controllers/adminControllers';
let router = express.Router();

const initAdminRoute = (app) => {
    router.get('/static', adminControllers.getHomePage);
    router.get('/adminProfile', adminControllers.getAdminProfile);
    router.get('/OdersManage', adminControllers.getOdersManage);
    router.get('/UsersManage', adminControllers.getUsersManage);
    router.get('/OriginManage', adminControllers.getOriginManage);
    router.get('/ProductManage', adminControllers.getProductManage);
    router.get('/TypeManage', adminControllers.getTypeManage);

    return app.use('/', router)
}

export default initAdminRoute;