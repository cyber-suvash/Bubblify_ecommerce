import React, { useState } from "react";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import Product from "../components/Product";
import Data from "../components/Data";

const ProductsPage = ({ data, setItem, filteredData }) => {

  const menuItems = [...new Set(Data.map((each) => each.category))];

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-4 products-heading">
          <h3>Top Products</h3>
          <p>Do not miss the current offers until the end of March</p>
        </div>
        <div className="col-md-5 products-menu">
          {menuItems.map((each) => (
            <Button key={each} onClick={() => filteredData(each)}
            className="">
              {each}
            </Button>
          ))}
        </div>
        <div className="col-md-2 d-flex align-items-center justify-content-end">
          <Button className="view-all mb-0" onClick={() => setItem(Data)}>
           view all <KeyboardDoubleArrowRightRoundedIcon />
          </Button>
        </div>
      </div>
      <Product data={data} />
    </div>
  );
};

export default ProductsPage;
