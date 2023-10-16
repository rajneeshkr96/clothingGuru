import {combineReducers} from "@reduxjs/toolkit";
import {
	productsReducer,
	newProductReducer,
	productReducer,
	productDetailsReducer,
	newReviewReducer,
	productReviewsReducer,
	reviewReducer,
} from "../reducers/productReducers";

const rootReducer = combineReducers({
  products: productsReducer,
  productDetails:productDetailsReducer,

});

export default rootReducer;
