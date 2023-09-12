const ProductModel = require('../models/product.model')

async function getProduct(req, res, next){

    try{
        const products = await ProductModel.findAll();
        // console.log(products);
        res.render('admin/products/all-products', {products: products});
    }catch(error){
        next(error);
        return;
    }
};

function createProduct(req, res){

    product = {
        title: '',
        summary: '',
        price: 0,
        description: '',
      }
    

    res.render('admin/products/new-product', {product: product});
};

async function addNewProduct(req, res){
    const product = new ProductModel({
        ...req.body,
        image: req.file.filename
    });
    
    await product.save();

    res.redirect('/admin/products');
};


async function getSingleProduct(req, res) {

    // console.log(req.params.id);

    try {
        const product = await ProductModel.findByID(req.params.id)

        res.render('admin/products/update-product', {product: product})
    } catch (error) {
        error.code = 404;
        return;
    }
  
}

async function updateProduct(req, res, next) {
    
    const product = new ProductModel({
        ...req.body,
        _id: req.params.id
    });

    if(req.file){
        product.replaceImage(req.file.filename);
    }

    try {
        product.save();
    } catch (error) {
        error.code = 404;
        next(error);
        return;
    }
    
    res.redirect('/admin/products');
}

async function deleteProduct(req, res, next) {

    try {

        const product = await ProductModel.findByID(req.params.id);
        await product.remove();
        res.json({message: 'Deleted product!'});
    } catch (error) {
        return next(error);
    }

}


module.exports = {
    getProduct: getProduct,
    createProduct: createProduct,
    addNewProduct: addNewProduct,
    getSingleProduct: getSingleProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
}


