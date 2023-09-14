const Product = require("../models/product.model");

async function addCartItem(req, res, next) {
  let product;
  try {
    product = await Product.findByID(req.body.productId);
  } catch (error) {
    return next(error);
  }

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
};
