function getProducts(req, res) {

    res.render('customer/product/products');
}


function getAllProducts(req, res) {
    res.redirect('/products');
}


module.exports = {
    getProducts: getProducts,
    getAllProducts: getAllProducts,
};