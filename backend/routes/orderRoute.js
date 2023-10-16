const express = require('express');
const Router = express.Router();

//...............................meddleeware imports................................
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/isAuthantictedUser');

//...............................controller imports................................
// all user controller imports are here 
const { createOrder, getSingleOrder, getSingleOrderById, getAllOrders, updateOrderById, deleteOrderById } = require('../controllers/orderController');



// create a new order => api/v1/order/new
Router.route("/order/new").post(isAuthenticatedUser,createOrder)
// get login user order => api/v1/me 
Router.route("/order/me").get(isAuthenticatedUser,getSingleOrder)
// get user by id => api/v1/order/:id
Router.route("/order/:id").get(isAuthenticatedUser,getSingleOrderById)

//...............................admin routes................................
// get all orders => api/v1/admin/orders
Router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders)
// update and delete orders => api/v1/admin/orders
Router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrderById)
                                .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrderById);



module.exports = Router;