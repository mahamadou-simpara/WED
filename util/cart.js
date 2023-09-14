const Cart = require('../models/cart.model')
function initializeCart (req, res, next) {

    let cartItem;

    if (!req.session.cart) {
        cartItem = new Cart();
    }else{
        cartItem = new Cart(req.session.cart.items);
    };

    res.locals.cart = cartItem;

    next();
};


module.exports = initializeCart;