const Product = require("../models/product.model");

function getCart(req, res) {

  res.render('customer/cart/cart');
};

async function addCartItem(req, res, next) {
  let product;
  // console.log(req.body);

  try {
    product = await Product.findByID(req.body.productId);
  } catch (error) {
    return next(error);
  };

  

  // console.log(product);
  const cart = res.locals.cart;
  cart.addItem(product);
  req.session.cart = cart;

  res.json({
    message: 'Cart successfully added!',
    newTotalItems: cart.totalQuantity
  })
};


function updateCartItem(req, res){
  // console.log(req.body);

  const cart = res.locals.cart;
  const result = cart.updateOne(req.body.productId, +req.body.newQuantity);
  req.session.cart = cart;

  // console.log(result);
  // // console.log(cart);

  res.json({
    message: 'Item sucessfully updated!',
    totalQuantity: cart.totalQuantity,
    itemsTotalPrice: cart.itemsTotalPrice,
    updatedItemPrice: result.updatedItemPrice
  })
}

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCartItem: updateCartItem
};
