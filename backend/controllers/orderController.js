const Order = require("../models/order");
const Product = require("../models/product");
const CustomError = require("../utils/CustomError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");


// create a new order => api/v1/order/new
const createOrder = asyncErrorHandler(async (req, res, next) => {
  const { shippindInfo,
        orderItems,
        itemsPrice,
        texPrice,
        paymentInfo,
        ShippingPrice,
        totalPrice,
        orderStatus } = req.body;

  const order = await Order.create({ shippindInfo,
                            orderItems,
                            itemsPrice,
                            texPrice,
                            paymentInfo,
                            ShippingPrice,
                            totalPrice,
                            orderStatus,
                            paidAt: Date.now(),
                            user:req.user.id
                                 });

  res.status(201).json({
    success:true,
    order,
  });
});


// get login user details => api/v1/order/me

const getSingleOrder = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.find({user:req.user.id});
  if(!order){
    return next(new CustomError("Order not found", 404));}
    res.status(200).json({
      success:true,
    order,
  });
});
// get order by id => api/v1/order/:id

const getSingleOrderById = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user",'name email');
  if(!order){
    return next(new CustomError("Order not found", 404));}
    res.status(200).json({
      success:true,
      order,
    });
  });

  //..................................admin controllers  ..............................
  
  // get all orders => api/v1/admin/orders
  
  const getAllOrders = asyncErrorHandler(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order => {
      totalAmount += order.totalPrice;
    });
    res.status(200).json({
      success:true,
      totalAmount:totalAmount,
      orders,
    });
  });

  // update order by id => api/v1/admin/order/:id
  const updateOrderById = asyncErrorHandler(async (req, res, next) => {
    const order = await Order.findByIdAndUpdate(req.params.id);
    if(!order){
      return next(new CustomError("Order not found", 404));}
    if(order.orderStatus === "delivered"){
        return next(new CustomError("Order already delivered", 400));}
      order.orderItems.forEach(async (orderItem) => {
        await updateStockOrder(orderItem.product, orderItem.quantity);

      });
    order.orderStatus = req.body.orderStatus;
    order.deliveryAt = Date.now();
    await order.save();

    res.status(200).json({
      success:true,
      order,
    });
  });

  async function updateStockOrder(id, quantity){
    const product = await Product.findById(id);
        product.stock = product.stock - quantity;
        product.save({validateBeforeSave: false});

  }
  
  // delete order by id => api/v1/admin/order/:id
  const deleteOrderById = asyncErrorHandler(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if(!order){
      return next(new CustomError("Order not found", 404));}
    res.status(200).json({
      success:true,
      order,
    });
  });
  
  // update order status by id => api/v1/admin/order/:id
  const updateOrderStatusById = asyncErrorHandler(async (req, res, next) => {
    const order = await Order.findByIdAndUpdate(req.params.id, {orderStatus:req.body.orderStatus}, {new:true});
    if(!order){
      return next(new CustomError("Order not found", 404));}
    res.status(200).json({
      success:true,
      order,
    });
  });
  
  
  module.exports = {createOrder,getSingleOrder,getSingleOrderById,getAllOrders,updateOrderById,deleteOrderById}