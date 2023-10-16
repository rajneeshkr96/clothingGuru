const express = require("express");
const router = express.Router()
//.................................. import authentiction middlewares..............................
const {isAuthenticatedUser,authorizeRoles} = require("../middlewares/isAuthantictedUser")
//...............................controller imports................................
// all product controller imports are here 
const {testing,newProduct,allProducts,singleProduct,updateProduct,deleteProduct, getProductReview, deleteProductReview, deleteReview} = require("../controllers/productController");
// all review controller imports are here 
const {createProductReview} = require("../controllers/productController");

//...............................router imports................................
// testing... 
router.route("/testing").get(isAuthenticatedUser,authorizeRoles("user"), testing);
// get all products 
router.route("/products").get(allProducts); 
// get single product
router.route("/product/:id").get(singleProduct); 
//..........................................admin routes............................................
// add new product 
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("user"),newProduct); 
// update and delete  product
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles("user"),updateProduct).delete(isAuthenticatedUser,deleteProduct); 

//...............................review routes............................................
//create product review => api/v1/review/new
router.route("/review/new").post(isAuthenticatedUser,createProductReview); 
router.route("/reviews").get(isAuthenticatedUser,getProductReview)
                        .delete(isAuthenticatedUser,deleteProductReview); 
 

module.exports = router;