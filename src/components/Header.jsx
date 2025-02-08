import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/photos/logo.png";
import SearchBox from "./SearchBox";
import CountrydropDown from "./CountrydropDown";
import Navbar from "./Navbar";
import "./Header.css";
const Header = ({addtoCart=[],wishlist=[]}) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header d-lg-none ">
        <div className="container ">
          <div className="d-flex justify-content-between align-items-center">
            <Button onClick={toggleSidebar}>
              <MenuIcon />
            </Button>
            <Link to="/">
              <img src={logo} alt="logo_img" className="mobile-logo" />
            </Link>
            <Link to="/cart">
              <Button>
                <Badge badgeContent={addtoCart.length} color="primary">
                  <ShoppingCartIcon style={{ color: "#2518ddbb" }} />
                </Badge>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Button>
            <img src={logo} alt="" className="mobile-logo" />
          </Button>
          <Button onClick={toggleSidebar}>
            <CloseIcon />
          </Button>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-search my-3">
            <SearchBox />
          </div>
          <div className="sidebar-country my-3">
            <CountrydropDown />
          </div>
          <div className="sidebar-links">
            <Link to="/login">
              <Button className="sidebar-link" onClick={toggleSidebar}>
                <AccountCircleIcon /> Sign In
              </Button>
            </Link>
            <Link to="/wishlist">
              <Button className="sidebar-link" onClick={toggleSidebar}>
                <Badge badgeContent={wishlist.length} color="warning">
                  <FavoriteBorderIcon />
                </Badge>
                Wishlist
              </Button>
            </Link>
            <Link to="/cart">
              <Button className="sidebar-link" onClick={toggleSidebar}>
                <Badge badgeContent={addtoCart.length} color="warning">
                  <ShoppingCartIcon />
                </Badge>
                Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="header d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="logo col-lg-3 d-flex align-items-center justify-content-between">
              <Link to="/">
                <img src={logo} alt="logo_img" />
              </Link>
              <CountrydropDown />
            </div>
            <div className="col-lg-9 d-flex align-items-center part2">
              <SearchBox />
              <div className="login d-flex align-items-center">
                <AccountCircleIcon sx={{ fontSize: 30 }} />
                <Link to="/login">
                  <Button className="login-btn ms-2">Sign In</Button>
                </Link>
              </div>
              <div className="wishlist">
                <Link to={"/wishlist"}>
                  {" "}
                  <Button>
                    <Badge badgeContent={wishlist.length} color="primary">
                      <FavoriteBorderIcon
                        style={{ color: "#2518ddbb", fontSize: "30px" }}
                      />
                    </Badge>
                    Wishlist
                  </Button>{" "}
                </Link>
              </div>
              <div className="cart">
                <Link to="/cart">
                  <Button>
                    <Badge badgeContent={addtoCart.length} color="primary">
                      <ShoppingCartIcon
                        style={{ color: "#2518ddbb", fontSize: "30px" }}
                      />
                    </Badge>
                    Cart
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar for desktop */}
      <div className="d-none d-lg-block">
        <Navbar />
      </div>
    </>
  );
};

export default Header;
