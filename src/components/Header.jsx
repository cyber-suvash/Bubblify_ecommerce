// Header.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import Avatar from "@mui/material/Avatar";

const Header = ({
  addtoCart = [],
  wishlist = [],
  isLoggedIn,
  handleLogout,
  user = [],
  profile_img,
}) => {
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
        <div className="sidebar-header px-3 py-1">
          <img src={logo} alt="" className="mobile-logo" />
          <Button onClick={toggleSidebar}>
            <CloseIcon sx={{ color: "red" }} />
          </Button>
        </div>
        <div className="sidebar-content">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <CountrydropDown />
            </div>
           {isLoggedIn? <div>
              <Avatar
                alt="Admin Avatar"
                src={profile_img}
                sx={{ width: 80, height: 80}}
              />
            </div>:""}
          </div>

          <div className="sidebar-links">
            {isLoggedIn ? (
              <>
                <Link to="/profile">
                  <Button className="sidebar-link">
                    <span>
                      welcome , <AccountCircleIcon /> {user.fullname}
                    </span>
                  </Button>
                </Link>

                <Button
                  className="bg-danger text-white"
                  onClick={() => {
                    handleLogout(), toggleSidebar();
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button className="sidebar-link" onClick={toggleSidebar}>
                  Sign In
                </Button>
              </Link>
            )}
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
                {isLoggedIn && (
                  <>
                    <Link to={"/profile"}>
                      <Button>
                        <Avatar
                          alt="Avatar"
                          src={profile_img}
                          sx={{ width: 60, height: 60 }}
                        />
                        <span
                          style={{
                            color: "#333",
                            fontWeight: "bold",
                            marginRight: "8px",
                          }}
                        >
                          {isLoggedIn && user?.fullname ? user.fullname.split(" ")[0] : ""}

                        </span>
                      </Button>
                  
                    </Link>
                    <Button className="logout-btn ms-2" onClick={handleLogout}>
                      Sign Out
                    </Button>
                  </>
                )}
                {!isLoggedIn && (
                  <Link to="/login">
                    <Button className="login-btn ms-2">Sign In</Button>
                  </Link>
                )}
              </div>
              <div className="wishlist">
                <Link to="/wishlist">
                  <Button>
                    <Badge badgeContent={wishlist.length} color="primary">
                      <FavoriteBorderIcon
                        style={{ color: "#2518ddbb", fontSize: "30px" }}
                      />
                    </Badge>
                    Wishlist
                  </Button>
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

      {/* Desktop Navbar */}
      <div className="d-none d-xs-block">
        <SearchBox />
        <Navbar />
      </div>
    </>
  );
};

export default Header;
