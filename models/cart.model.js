class Cart {
    constructor(items = [], totalQuantity = 0, itemsTotalPrice = 0) {
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.ItemsTotalPrice = itemsTotalPrice
    };

    addItem(product) {
        cartItem = {
            product: product,
            Quantity: 0,
            totalPrice: product.price
        }

        for(let i = 0; i < this.items.length; i++){
            const item =  this.items[i];

            if (item.product.id === product.id) {
                cartItem.Quantity =  cartItem.Quantity + 1;
                cartItem.totalPrice = cartItem.totalPrice + product.price;
                this.totalQuantity++;
                this.ItemsTotalPrice += product.price;
                this.items[i] = cartItem;
                return;
            };
        };

       this.items.push(cartItem);
       this.totalQuantity++;
       this.ItemsTotalPrice += product.price;
    }
};


module.exports = Cart;