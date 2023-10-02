const express = require('express');
const orderControlller = require('../controllers/order.controller')

const router = express.Router();

router.post('/', orderControlller.addOrder);

router.get('/', orderControlller.getOrder);


module.exports = router;