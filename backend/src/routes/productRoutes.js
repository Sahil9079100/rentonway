import express from 'express';
import { 
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getRetailerProducts,
  getFeaturedProducts
} from '../controllers/productController.js';
import { protect, retailer } from '../middlewares/authMiddleware.js';
import { uploadProductImages } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);

// Retailer routes
router.post('/', protect, retailer, uploadProductImages, createProduct);
router.put('/:id', protect, retailer, uploadProductImages, updateProduct);
router.delete('/:id', protect, retailer, deleteProduct);
router.get('/retailer/products', protect, retailer, getRetailerProducts);

export default router;