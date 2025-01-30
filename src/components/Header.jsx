import logo from "../assets/photos/logo.png";
import CountrydropDown from "./CountrydropDown";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import SearchBox from "./SearchBox";
import Navbar from "./Navbar";

const Header = ({ isOpenSidebar }) => {
  return (
    <>
     
        <div className={`header ${isOpenSidebar?'sidebar-active':""}`}>
          <div className="container">
            <div className="row">
              {/* Logo Section */}
              <div className="logo col-sm-1 d-flex align-items-center">
                <Link to={"/"}>
                  <img src={logo} alt="logo_img" />
                </Link>
              </div>

              {/* Right Section */}
              <div className="col-sm-11 d-flex align-items-center part2">
                <CountrydropDown />

                {/* Search Box */}
                <SearchBox />

                {/* Login Section */}
                <div className="login d-flex align-items-center">
                  <AccountCircleIcon sx={{ fontSize: 30 }} />
                  <Link to={"/login"}>
                    <Button className="login-btn ms-2">Sign In</Button>
                  </Link>
                </div>

                {/* Wishlist */}
                <div className="wishlist">
                  <Button>
                    <Badge badgeContent={1} color="primary">
                      <FavoriteBorderIcon
                        style={{ color: "#2518ddbb", fontSize: "30px" }}
                      />
                    </Badge>
                    Wishlist
                  </Button>
                </div>

                {/* Cart Section */}
                <div className="cart">
                  <Link to={"/cart"}>
                    <Button>
                      <Badge badgeContent={2} color="primary">
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
      

      {/* Navbar should always be visible */}
      <Navbar />
    </>
  );
};

export default Header;
