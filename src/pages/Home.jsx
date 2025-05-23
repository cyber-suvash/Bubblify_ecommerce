import React, { useState } from "react";
import Header from "../components/Header";
import HomeBanner from "../components/HomeBanner";
import ProductsPage from "./ProductPage";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Data from "../components/Data.js";
import Product from "../components/Product";
import { Toaster } from 'react-hot-toast';
import Pagination from "../components/Pagination";

export const Home = ({ handleAddtoCart, addtoCart, wishlist,handleWishlist,isLoggedIn,handleLogout ,user,setUser,profile_img}) => {
  const [item, setItem] = useState(Data);
  const [activeCategory, setActiveCategory] = useState("");
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const handleSidebar = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  const handleViewallProducts = () => {
    setItem(Data);
    setActiveCategory("");
  };

  const filteredData = (category) => {
    const newItems = Data.filter((each) => each.category === category);
    setItem(newItems);
    setActiveCategory(category);
  };

  return (
    <>
    <Toaster/>
      <Header
        isOpenSidebar={isOpenSidebar}
        handleSidebar={handleSidebar}
        addtoCart={addtoCart}
        wishlist={wishlist}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        setUser={setUser} user={user} profile_img={profile_img}
      />
      <HomeBanner />
      {/* <Pagination handleAddtoCart={handleAddtoCart}/> */}
      <ProductsPage
        data={item}
        filteredData={filteredData}
        viewAll={handleViewallProducts}
        activeCategory={activeCategory}
        handleAddtoCart={handleAddtoCart}
      />
      <Product
        data={item}
        handleAddtoCart={handleAddtoCart}
        wishlist={wishlist}
        handleWishlist={handleWishlist}
      />
      <Newsletter />
      <Footer />
    </>
  );
};
