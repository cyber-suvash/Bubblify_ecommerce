import React, { useContext, useState } from "react";
import Header from "../components/Layout/Header.jsx";
import HomeBanner from "../components/HomeBanner";
import ProductsPage from "./Heading.jsx";
import Newsletter from "../components/Newsletter";
import Data from "../components/Data.js";
import Product from "../components/Product";
import { Toaster } from "react-hot-toast";
import Pagination from "../components/Pagination";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Foooter2 from "../components/Foooter2.jsx";


export const Home = ({
  handleAddtoCart,
  wishlist,
  handleWishlist,
}) => {
  const [item, setItem] = useState(Data);
  const [activeCategory, setActiveCategory] = useState("");

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
      <Toaster />
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
      <div className="container">
        <div className="row d-flex justify-content-between">
          <div className="col-md-2 foot-top">
            <LocalShippingIcon />
            <span>Free delivery over $70</span>
          </div>
          <div className="col-md-2 foot-top">
            <LocalOfferIcon />
            <span>Daily Mega Discounts</span>
          </div>
          <div className="col-md-2 foot-top">
            <LocalOfferIcon />
            <span>Best price available</span>
          </div>
          <div className="col-md-2 foot-top">
            <LocalOfferIcon />
            <span>Everyday New products</span>
          </div>
        </div>
      </div>
      <Foooter2 />
    </>
  );
};
