import express from 'express';
import { addOrderItems } from "../controllers/order.controller.js";
import {authenticateUser} from "../middlewares/auth.middleware.js"


const router = express.Router();
router.post('/', authenticateUser, addOrderItems);

export default router;