const ProductModel = require('../models/product.model')

async function getProduct(req, res, next){

    try{
        const products = await ProductModel.findAll();
        console.log(products);
        res.render('admin/products/all-products', {products: products});
    }catch(error){
        next(error);
        return;
    }
};

function createProduct(req, res){
    res.render('admin/products/new-product');
};

async function addNewProduct(req, res){
    const product = new ProductModel({
        ...req.body,
        image: req.file.filename
    });
    
    await product.save();

    res.redirect('/admin/products');
};



module.exports = {
    getProduct: getProduct,
    createProduct: createProduct,
    addNewProduct: addNewProduct
}


