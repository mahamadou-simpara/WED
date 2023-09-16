const Product = require("../models/product.model");

function getCart(req, res) {
  res.render('customer/cart/cart');
}

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
}

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart
};
