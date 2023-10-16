import React, { useEffect,useRef } from "react";
import HeroSection from "../Components/HeroSection/HeroSection";
import MetaData from "../Components/layout/MetaData";
import ActionCard from "../Components/ActionCard/ActionCard";
import { getProducts } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Components/layout/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from "../Components/layout/message";
import InfoCard from "../Components/InfoCard/InfoCard";
import { TbTruckDelivery,TbCurrencyRupeeNepalese } from "react-icons/tb";
import { MdOutlineSupportAgent } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
function Home() {
  const featureRef = useRef();
  const newRef = useRef();
  const bestRef = useRef();
  const dispatch = useDispatch();
  const { loading, products,error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const featuredSection = () => {
    featureRef.current.classList.add('select-theme');
    newRef.current.classList.remove('select-theme');
    bestRef.current.classList.remove('select-theme');
  }
  const newSection = () => {
    featureRef.current.classList.remove('select-theme');
    newRef.current.classList.add('select-theme');
    bestRef.current.classList.remove('select-theme');
    
  }
  const bestSection = () => {
    featureRef.current.classList.remove('select-theme');
    newRef.current.classList.remove('select-theme');
    bestRef.current.classList.add('select-theme');
    
  }
  
  return (
    <>
      <MetaData title="home page" />
<div className=" mt-2">
  {/* ....................hero section.................................  */}
          <HeroSection />

  {/* ....................info section.................................  */}
          <section className=" flex flex-wrap justify-center">
            {/* 1 */}
            <InfoCard title={"free delivery"} discription={" free shipping for all orders over ₹500"}><TbTruckDelivery size={"25px"}/></InfoCard>
            {/* 2 */}
            <InfoCard title={"money back guarantee"} discription={"you can get your  money back within 7days"}><TbCurrencyRupeeNepalese className="mt-2 mr-2" size={"20px"}/> </InfoCard>
            {/* 3 */}
            <InfoCard title={"24/7 support"} discription={"call us free:+91 9100000000 "}><MdOutlineSupportAgent className="mt-1 mr-2"/></InfoCard>
            {/* 4 */}
            <InfoCard title={"satisfaction"} discription={"we have the best service for you"}><AiFillLike className="mt-1 mr-2"/></InfoCard>
          </section>
            {/* ....................products section section.................................  */}
            <section>
              <div className="mt-6 " >
                <div className="uppercase flex justify-center items-center my-5  h-10 font-bold text-xl theme-color-2" style={{ fontFamily: "font-family: 'Oswald', sans-serif;" }}>
                  <p className="mx-2" onClick={newSection} ref={newRef}>new</p>
                  <p className="mx-2 select-theme" onClick={featuredSection} ref={featureRef}>featured</p>
                  <p className="mx-2" onClick={bestSection} ref={bestRef}>best</p>
                </div>
              </div>

          <div className=" flex flex-wrap justify-evenly" style={{justifyContent:"space-evenly"}}>
            {loading ? (
              <Loader />
              ) : error?<Message error={error.message}/>:(
              products?.map((product) => (
                <ActionCard
                  key={product._id}
                  id={product._id}
                  title={product.name}
                  price={product.price}
                  img1={product.images[0].url}
                  img2={product.images[1].url}
      
                />
              ))
            )}
          </div>
            </section>

 
      <ToastContainer />

</div>
       
    </>
  );
}

export default Home;
