import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderToDelivered
} from "../controllers/order.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js"
import {authorizeAdmin} from "../middlewares/admin.middleware.js"

const router = express.Router();
router.post('/', authenticateUser, addOrderItems);
router.get('/myorders', authenticateUser, getMyOrders);
router.get('/:id', authenticateUser, getOrderById);

router.put('/:id/pay',authenticateUser,updateOrderToPaid);

router.get('/',authenticateUser,authorizeAdmin,getOrders);

router.post('/:id/deliver',authenticateUser,authorizeAdmin,updateOrderToDelivered);

export default router;