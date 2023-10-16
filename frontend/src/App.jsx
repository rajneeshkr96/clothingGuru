import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom"
import NavBar from "./Components/layout/NavBar";
import Home from "./Pages/Home";
import SingleProduct from "./Pages/SingleProduct";
import Search from "./Pages/Search";

function App() {
  return (
    <>
        <div className="flex">
        <div className="nav-space"></div>
        <div>
    <NavBar/>
     <Routes>
      <Route path="/" element={<Home />} exact/>
      <Route path="/product/:id" element={<SingleProduct/>}/>
      <Route path="/search/:keyword" element={<Search/>}/>
    </Routes>
        </div>
        </div>
    </>
  );
}

export default App;
