class Cart {
  constructor(items = [], totalQuantity = 0, itemsTotalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.itemsTotalPrice = itemsTotalPrice;
  }

  addItem(product) {
    const cartItem = {
      product: product,
      Quantity: 1,
      totalPrice: product.price,
    };

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.product.id === product.id) {
        cartItem.Quantity = this.items[i].Quantity + 1;
        cartItem.totalPrice = this.items[i].totalPrice + product.price;
        this.totalQuantity++;
        this.itemsTotalPrice += product.price;
        this.items[i] = cartItem;
        return;
      }
    }

    this.items.push(cartItem);
    this.totalQuantity++;
    this.itemsTotalPrice += product.price;
  }

  updateOne(productId, newQuantity) {
    for(let i = 0; i < this.items.length; i++){
        const item = this.items[i];
        if (item.product.id === productId && newQuantity > 0) {
            const cartItem = {...item};
            const changeQuantity = newQuantity - cartItem.Quantity;
            cartItem.Quantity = newQuantity;
            cartItem.totalPrice = newQuantity * cartItem.product.price;
            this.items[i] = cartItem;


            this.totalQuantity = this.totalQuantity + changeQuantity;
            this.itemsTotalPrice += changeQuantity * cartItem.product.price;            
            return { updatedItemPrice: cartItem.totalPrice };
        } else if(item.product.id === productId && newQuantity >= 0){
            this.items.splice(i, 1);

            const cartItem = {...item};
            this.totalQuantity = this.totalQuantity - cartItem.Quantity;
            this.itemsTotalPrice = this.itemsTotalPrice - cartItem.totalPrice;    
            return { updatedItemPrice: 0 };
        }
    }
  }
 
}

module.exports = Cart;
