function getProduct(req, res){
    res.render('admin/products/all-products');
};

function createProduct(req, res){
    res.render('admin/products/new-product');
};

function addNewProduct(req, res){

    console.log(req.body);
    console.log(req.file);
    res.redirect('/admin/products');
};



module.exports = {
    getProduct: getProduct,
    createProduct: createProduct,
    addNewProduct: addNewProduct
}


