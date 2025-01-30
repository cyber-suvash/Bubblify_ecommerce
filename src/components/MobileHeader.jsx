import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import logo from "../assets/photos/logo.png";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const MobileHeader = ({isOpenSidebar,handleSidebar}) => {
  return (

    <section className="mobile-header">
        <div className="container d-flex justify-content-between align-items-center">
      <div>
          {isOpenSidebar? <CloseIcon onClick={handleSidebar}/>:<MenuIcon  onClick={handleSidebar}/>}
      </div>

      <div className="mobilelogo">
        <Link to={"/"}>
          {" "}
          <img src={logo} alt="logo_img" />{" "}
        </Link>
      </div>

      <div className="cart-item">
        <Link to={"/cart"}>
          <Button>
            <Badge badgeContent={2} color="primary">
              <ShoppingCartIcon
                style={{ color: "#2518ddbb", fontSize: "25px" }}
              />
            </Badge>
            Cart
          </Button>
        </Link>
      </div>
    </div>
    </section>
    
  );
};

export default MobileHeader;
