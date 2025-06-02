// Header.jsx
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "/photos/logo.png";
import SearchBox from "../SearchBox";
import CountrydropDown from "../CountrydropDown";
import Navbar from "../Navbar";
import "./Header.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Avatar from "@mui/material/Avatar";
import { ProductContext } from "../../context/ProductContextAPI";
import Switch from '@mui/material/Switch';

const Header = ({
  wishlist = [],
  isLoggedIn,
  handleLogout,
  user = [],
  profile_img,
}) => {
  const { addtoCart,darkmode,setDarkmode } = useContext(ProductContext);

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
            <Button onClick={() => setDarkmode((prev) => !prev)}>
              {darkmode ? <LightModeIcon /> : <DarkModeIcon style={{color:"black"}}/>}
            </Button>
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
        <div className="sidebar-content min-vh-100">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <CountrydropDown />
            </div>
            {isLoggedIn ? (
              <div>
                <Avatar
                  alt="Avatar"
                  src={profile_img}
                  sx={{ width: 60, height: 60 }}
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="sidebar-links">
            {isLoggedIn ? (
              <>
                <Link to="/profile">
                  <Button className="sidebar-link">
                    <span>welcome, {user.fullname}</span>
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
       {isLoggedIn && user.isAdmin ?<Link to={'/admin-dashboard'}><Button>go to Admin</Button></Link>:'' }
        </div>
      </div>

      {/* Desktop Header */}

      <div className="mobile-header d-none d-lg-block">
        <div className="container-fluid">
          <div className="row">
            <div className="logo col-lg-3 d-flex align-items-center justify-content-between">
              <Link to="/">
                <img src={logo} alt="logo_img" />
              </Link>
              <CountrydropDown />
            </div>
            <div className="col-lg-9 d-flex align-items-center justify-content-between part2">
              <SearchBox />
              <div className="login d-flex align-items-center">
                {isLoggedIn && (
                  <>
                    <Link to={"/profile"}>
                      <Button>
                        <Avatar
                          alt="Avatar"
                          src={profile_img}
                          sx={{ width: 50, height: 50, objectFit: "contain" }}
                        />
                        <p className="text-center">
                          {isLoggedIn && user?.fullname
                            ? user.fullname.split(" ")[0]
                            : ""}
                        </p>
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
              <Button onClick={() => setDarkmode((prev) => !prev)}>
                {darkmode ? <LightModeIcon /> : <DarkModeIcon style={{color:"black"}} />}
              </Button>
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
