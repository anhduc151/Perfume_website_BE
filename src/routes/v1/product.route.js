import express from 'express';
import { productController } from '../../controllers/product.controller.js';

const router = express.Router();

router
  .route('/products')
  .get(productController.getProducts) // Get all Product from Database
  .post(productController.getProdutcsById); // Get list product by id
router.route('/create_product').post(productController.createProduct);
router.route('/products/search').get(productController.getSearchProduct);
router.route('/products/:id').get(productController.getProductSingle).delete(productController.deleteProduct);
export const ProductRoute = router;
