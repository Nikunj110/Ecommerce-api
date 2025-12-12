import express from 'express';
import { addOrderItems ,getMyOrders} from "../controllers/order.controller.js";
import {authenticateUser} from "../middlewares/auth.middleware.js"


const router = express.Router();
router.post('/', authenticateUser, addOrderItems);
router.post('/myorders',authenticateUser,getMyOrders);

export default router;