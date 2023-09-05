const db = require("../data/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image;
    this.imageUrl = `uploaded-data/images/${productData.image}`;
    this.imagePath = `/products/assets/images/${productData.image}`;
    if (productData._id) {
      this.id = productData._id.toString();
    };
  }

  static async findAll() {
    const products = await db.getDB().collection("products").find().toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }
  async save() {
    const product = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };
    db.getDB().collection("products").insertOne(product);
  }
}

module.exports = Product;
