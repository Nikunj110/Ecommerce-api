import express from 'express'

import {
  getAllProducts,
  createProduct,
  getProduct
  , updateProduct,
  deleteProduct
  
} from '../controllers/product.controller.js';

import authenticateUser from '../middlewares/auth.middleware.js'
import authorizeAdmin from '../middlewares/admin.middleware.js'

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);


router.post('/', authenticateUser,authorizeAdmin,createProduct);
router.patch('/:id', authenticateUser,authorizeAdmin,updateProduct);
router.delete('/:id',authenticateUser,authorizeAdmin,deleteProduct)

export default router;