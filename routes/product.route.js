const express = require('express');
const productController = require('../controllers/product.controller')

const router = express.Router();

router.get('/products', productController.getProducts);

router.get('/', productController.getAllProducts);

router.get('/product-detail/:id', productController.getProductDetail)


module.exports = router;

//// Scoffing, jesting, applauding.