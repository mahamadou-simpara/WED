const OrderModel = require("../models/order.model");
const Usermodel = require("../models/user.model");

async function addOrder(req, res, next) {
  let user;

  try {
    user = await Usermodel.getUserById(req.session._id);
  } catch (error) {
    return next(error);
  }

  try {
    const order = new OrderModel(req.session.cart, user);
    await order.save();

  } catch (error) {
    return next(error);
  }

  req.session.cart = null;

  res.redirect("/order");
}

async function getOrder(req, res, next) {

  // console.log(req.session._id);

  try {
  const  orderedData = await OrderModel.findAllforUser(req.session._id);

  console.log(orderedData);
    res.render("customer/order/all-order", {orderedData: orderedData});
  } catch (error) {
    return next(error)
  }
  
}

module.exports = {
  addOrder: addOrder,
  getOrder: getOrder,
};
