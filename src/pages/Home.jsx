import React, { useState } from "react";
import Header from "../components/Header";
import Dropdown from "../components/Dropdown";
import HomeBanner from "../components/HomeBanner";
import ProductsPage from "./ProductPage";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import MobileHeader from "../components/MobileHeader";



const menuData = [
  {
    id: 1,
    label: "Parent 1",
    children: [
      { id: 2, label: "Child 1.1" },
      { id: 3, label: "Child 1.2" },
    ],
  },
  {
    id: 4,
    label: "Parent 2",
    children: [{ id: 5, label: "Child 2.1" }],
  },
];



export const Home = () => {

  const [isOpenSidebar,setIsOpenSidebar]=useState(false)

  const handleSidebar=()=>{
    setIsOpenSidebar((obj)=>!obj)
    console.log(isOpenSidebar)
  }
  return <>
  <MobileHeader  isOpenSidebar={isOpenSidebar} handleSidebar={handleSidebar}/>
  <Header isOpenSidebar={isOpenSidebar}/>
  {/* <Dropdown item={menuData}/> */}
  <HomeBanner/>
  <ProductsPage/>
  <Newsletter/>
  <Footer/>
 </>
};
