import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid
} from "../controllers/order.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js"


const router = express.Router();
router.post('/', authenticateUser, addOrderItems);
router.get('/myorders', authenticateUser, getMyOrders);
router.get('/:id', authenticateUser, getOrderById);

router.put('/:id/pay',authenticateUser,updateOrderToPaid);

export default router;