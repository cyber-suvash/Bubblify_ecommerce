import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import ProductsTab from "../components/ProductsTab";
const ProductsPage = () => {
  const [isActiveButton, setIsActiveButton] = useState(false);
  const handleActiveButton = (e) => {
    setIsActiveButton((prev) => !prev);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 products-heading">
          <h3>Top Products</h3>
          <p>
            Do not miss the current offers until the end of March
          </p>
        </div>
        <div className="col-md-5 products-menu list-inline ">
          <li className="me-2">
            <Link to={"/"}>
              <Button
                className={isActiveButton ? "active-button" : ""}
                onClick={handleActiveButton}
              >
                Electronics
              </Button>
            </Link>
          </li>
          <li className="me-2">
            <Link to={"/"}>
              <Button
                className={isActiveButton ? "active-button" : ""}
                onClick={handleActiveButton}
              >
                Fashion
              </Button>
            </Link>
          </li>
          <li className="me-2">
            <Link to={"/"}>
              <Button
                className={isActiveButton ? "active-button" : ""}
                onClick={handleActiveButton}
              >
                Footware
              </Button>
            </Link>
          </li>
          <li className="me-2">
            <Link to={"/"}>
              <Button
                className={isActiveButton ? "active-button" : ""}
                onClick={handleActiveButton}
              >
                Beauty
              </Button>
            </Link>
          </li>
        </div>
        <div className="col-md-2  d-flex align-items-center justify-content-end">
          <Button className="view-all mb-0">
            view all <KeyboardDoubleArrowRightRoundedIcon />
          </Button>
        </div>
      </div>
      <ProductsTab/>
    </div>
  );
};

export default ProductsPage;
