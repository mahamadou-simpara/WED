const Cart = require('../models/cart.model')
function initializeCart (req, res, next) {

    let cartItem;

    if (!req.session.cart) {
        cartItem = new Cart();
    }else{
        const cart = req.session.cart
        cartItem = new Cart(cart.items, cart.totalQuantity, cart.itemsTotalPrice);
    };

    res.locals.cart = cartItem;

    next();
};


module.exports = initializeCart;