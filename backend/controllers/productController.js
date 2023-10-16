// all imports   
const Product = require("../models/product");
const ErrorHandler = require("../utils/CustomError");
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const Apifeatures = require("../utils/ApiFeatures")


// testing... 
const testing = (req, res) => {
  res.status(200).json({ success: true, test: "working...." })
}

//create new product => /api/v1/product/new
const newProduct = asyncErrorHandler(async (req, res, next) => {
  req.body.user = req.user.id; // add user refresh to the new product 
  console.log(req.body.user)
  const product = await Product.create(req.body)
  res.status(201).json({
    success: true,
    products: product,
  })

})

//get all products with api features like,search,filter,sort,limitefields,pagination=> /api/v1/products
const allProducts = asyncErrorHandler(async (req, res, next) => {
  const apiFeatures = new Apifeatures(Product.find(),req.query)
  .search()
  .filter()
  .sort()
  .limitFields()
  .paginate()
  const product = await apiFeatures.query;
  const productcount = await Product.countDocuments()
  res.status(200).json({
    success: true,
    count: product.length,
    productcount:productcount,
    products: product,
  })

})

//get single product details => /api/v1/product/:id
const singleProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler("Product not found..", 404))
  }
  res.status(200).json({
    success: true,
    product,
  })


})

//update product details => /api/v1/product/:id
const updateProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found"
    })
  }
  const updatedpd = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })

  res.status(200).json({
    success: true,
    updatedpd,
  })


})

//delete product   => /api/v1/product/:id
const deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found"
    })
  }
  const deletedpd = await Product.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    message: "Product is deleted",
    deletedpd
  })


})

//......................................product review controllers..........................
//create product review => api/v1/review/new

const createProductReview = asyncErrorHandler(async (req, res, next) => {
  const {productId ,rating,comment} = req.body;
  const reviews = { 
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment: comment

  }
  const product = await Product.findById(productId)
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found"
      })
    }
    const isReview = product.reviews.find(r => {
      return r.user.toString() === req.user._id.toString();
    }  )
 if (isReview) {
   product.reviews.forEach(review => {
     if (review.user.toString() === req.user._id.toString()) {
      review.comment = comment,
      review.rating = rating
     } 
   });
 }
 else {
   product.reviews.push(reviews)
   product.numofreviews = product.reviews.length
 }

// product ratings 
product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
await product.save({ validateBeforeSave: false });
  res.status(201).json({
    success: true,
    reviews,
  })
  })

  //get all reviews => /api/v1/review
  const getProductReview = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  const review = product.reviews
  res.status(200).json({
    success: true,
    reviews:review,
  })

})

//delete product review => /api/v1/review

const deleteProductReview = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found"
    })
  }

  console.log(product);

  const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

  const numofreviews = reviews.length;

  let ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) 
  if (ratings) {
    ratings = 0
  }

  await Product.findByIdAndUpdate(req.query.productId, {
      reviews,
      ratings,
      numofreviews
  }, {
      new: true,
      runValidators: true,
      useFindAndModify: false
  })
  res.status(200).json({
    success: true,
    message: "Product review is deleted",
  })

})


// all product controllers exports 
module.exports = { testing, newProduct, allProducts, singleProduct, updateProduct, deleteProduct,createProductReview ,getProductReview,deleteProductReview}
