import React, { useState } from "react";
import Header from "../components/Header";
import HomeBanner from "../components/HomeBanner";
import ProductsPage from "./ProductPage";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Data from "../components/Data";
import Pagination from "../components/Pagination";
export const Home = () => {
  const [item, setItem] = useState(Data);
  const [activeCategory,setActiveCategory]=useState("")

  const handleViewallProducts=()=>{
    setItem(Data)
    setActiveCategory('')
    
  }
  

  const filteredData = (category) => {
    const newItems = Data.filter((each) => each.category === category);
    setItem(newItems);
    setActiveCategory(category)

  };

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const handleSidebar = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  return (
    <>
      <Header isOpenSidebar={isOpenSidebar} handleSidebar={handleSidebar}  />
      <HomeBanner />
      {/* <Pagination/> */}
      <ProductsPage data={item} filteredData={filteredData} viewAll={handleViewallProducts} activeCategory={activeCategory} />
      <Newsletter />
      <Footer />
    </>
  );
};
  