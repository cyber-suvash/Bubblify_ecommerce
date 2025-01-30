import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Foooter2 from "./Foooter2";
import Footer3 from "./Footer3";
const Footer = () => {
  return (
    <>
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
      <hr className="mt-5" />

      <Foooter2 />
      <Footer3/>
    </>
  );
};

export default Footer;
