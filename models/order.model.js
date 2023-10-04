const db = require("../data/database");
const mongodb = require("mongodb");

class Order {
  constructor(cart, userData, status = "pending", date, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    this.orderId = orderId;
  }

  static transformDocument(orderDoc) {
    // console.log(orderDoc);
    return new Order(
      orderDoc.orderedItems,
      orderDoc.userData,
      orderDoc.status,
      orderDoc.date,
      orderDoc._id
    );
  }

  static transformOrderDocuments(orderDocs) {
    return orderDocs.map(this.transformDocument);
  }

  async save() {
    if (this.orderId) {
   
    } else {
      const orderData = {
        orderedItems: this.productData,
        userData: this.userData,
        date: new Date(),
        status: this.status,
      };
      await db.getDB().collection("orders").insertOne(orderData);
    }
  }

  static async findAllOrders() {
    let orders = [];
    orders = await db
      .getDB()
      .collection("orders")
      .find()
      .sort({ _id: -1 })
      .toArray();

    // orders = await db.getDB().collection('orders').deleteMany({});

    return this.transformOrderDocuments(orders);
  }

  static async findAllforUser(userId) {
    const uid = new mongodb.ObjectId(userId);
    let orders = [];
    orders = await db
      .getDB()
      .collection("orders")
      .find({ "userData._id": uid })
      .sort({ _id: -1 })
      .toArray();

    return this.transformOrderDocuments(orders);
  }

  static findById(id) {
    const orderId = new mongodb.ObjectId(id);
    console.log(orderId);

    return db.getDB().collection("orders").findOne({ _id: orderId });
  }

  static async updateOrder(id, status) {
    const orderId = new mongodb.ObjectId(id);
    await db
      .getDB()
      .collection("orders")
      .updateOne(
        { _id: orderId },
        {
          $set: { status: status},
        }
      );
  }
}





module.exports = Order;
