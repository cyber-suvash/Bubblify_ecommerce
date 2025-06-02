import React, { useContext, useState } from "react";
import Header from "../components/Layout/Header.jsx";
import HomeBanner from "../components/HomeBanner";
import Heading from "./Heading.jsx";
import Newsletter from "../components/Newsletter";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Foooter2 from "../components/Foooter2.jsx";


export const Home = ({
  handleAddtoCart,
  wishlist,
  handleWishlist,
}) => {

  return (
    <>
      <HomeBanner />
      {/* <Pagination handleAddtoCart={handleAddtoCart}/> */}
      <Heading
        handleAddtoCart={handleAddtoCart}
      />
      <Product
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
