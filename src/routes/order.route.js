import express from 'express';
import { addOrderItems ,getMyOrders,getOrderById} from "../controllers/order.controller.js";
import {authenticateUser} from "../middlewares/auth.middleware.js"


const router = express.Router();
router.post('/', authenticateUser, addOrderItems);
router.get('/myorders',authenticateUser,getMyOrders);
router.get('/getorder/:id',authenticateUser,getOrderById);

export default router;