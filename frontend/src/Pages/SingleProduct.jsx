import React, { useEffect } from "react";
import { getProductDetails } from "../actions/productActions";
import Loader from "../Components/layout/Loader";
import Message from "../Components/layout/message";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
function SingleProduct() {
  const dispatch = useDispatch();
  const param = useParams()
  useEffect(()=>{
    dispatch(getProductDetails(param.id))
  },[dispatch])
  const { loading,product,error } = useSelector((state) => state.productDetails);

  return (<>
  <div className="">
  {loading ? (
              <Loader />
            ) : error?<Message error={error.message}/>:
            <ProductDetails
             title={product.name}
             price={product.price}
             description={product.discription}
             stock={product.stock}
             img={product.images[0].url}

            />}
     
  </div>

  </>)
}

export default SingleProduct;
