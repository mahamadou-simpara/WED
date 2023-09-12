const { ObjectId } = require('mongodb');
const db = require("../data/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image;
    this.updateImageData();
    if (productData._id) {
      this.id = productData._id.toString();
    };
  }

  static async findByID(productId) {
    try {
      const id = new ObjectId(productId);
      const product = await db
        .getDB()
        .collection("products")
        .findOne({ _id: id });

        // if(!product){
        //   error.code = 404;
        // }

      return new Product(product);
    } catch (error) {

      // throw new Error("Could' not find the id");
      console.log(error);
    };
  };

  static async findAll() {
    const products = await db.getDB().collection("products").find().toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  };


  async save() {
    const product = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    if(this.id){
      const id = new ObjectId(this.id);
      if(!product.image){
        delete product.image;
      }
      await db.getDB().collection('products').updateOne({_id: id}, { $set: product})
    }else{
      await db.getDB().collection("products").insertOne(product);
    }

  };

  updateImageData(){
    this.imageUrl = `uploaded-data/images/${this.image}`;
    this.imagePath = `/products/assets/images/${this.image}`;
  };

  async remove(){
    const productId = new ObjectId(this.id);
    await db.getDB().collection("products").deleteOne({_id: productId});
  };


  replaceImage(newImage){
    this.image = newImage;
    this.updateImageData();
  }
}

module.exports = Product;
