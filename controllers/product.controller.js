const ProductModel = require('../models/product.model')

async function getProducts(req, res) {


    const products = await ProductModel.findAll();

    res.render('customer/product/products', {products: products });
};


async function getProductDetail(req, res, next) {
    const product = await ProductModel.findByID(req.params.id);
    // console.log(product);
    res.render('customer/product/product-detail', {product: product});
}
function getAllProducts(req, res) {
    res.redirect('/products');
};


module.exports = {
    getProducts: getProducts,
    getAllProducts: getAllProducts,
    getProductDetail: getProductDetail
};