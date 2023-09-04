const express = require('express');
const adminControllers = require('../controllers/admin.controller');
const getUploadedImage = require('../middlewares/upload-image')

const router = express.Router();

router.get('/products', adminControllers.getProduct);

router.get('/product/new', adminControllers.createProduct);

router.post('/products', getUploadedImage, adminControllers.addNewProduct);

module.exports = router;