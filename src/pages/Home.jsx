import React, { useState } from "react";
import Header from "../components/Header";
import Dropdown from "../components/Dropdown";
import HomeBanner from "../components/HomeBanner";
import ProductsPage from "./ProductPage";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";


export const Home = () => {

  const [isOpenSidebar,setIsOpenSidebar]=useState(false)

  const handleSidebar=()=>{
    setIsOpenSidebar((obj)=>!obj)
  }
  return <>
  <Header isOpenSidebar={isOpenSidebar} handleSidebar={handleSidebar}/>
  <HomeBanner/>
  <ProductsPage/>
  <Newsletter/>
  <Footer/>
 </>
};
