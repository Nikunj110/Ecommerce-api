import express from 'express'

import {
  getAllProducts,
  createProduct,
  getProduct
  , updateProduct,
  deleteProduct
  
} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getAllProducts);

router.post('/', createProduct);
router.get('/:id', getProduct);
router.patch('/:id', updateProduct);
router.delete('/:id',deleteProduct)

export default router;