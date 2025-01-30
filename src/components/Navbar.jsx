import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import CategoryDropDown from "./CategoryDropDown";


const Navbar = () => {
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const handleCategory = () => {
    setIsOpenCategory((obj) => !obj);
  };

  const allCategory = [
    {
      id: 1,
      item: "Electronics",
      children: [
        { item: "SmartPhone" },
        { item: "Laptop" },
        { item: "SmartWatch" },
      ],
    },
    {
      id: 5,
      item: "Footware",
      children: [{ item: "Men footware" }, { item: "Women footware" }],
    },
    {
      id: 8,
      item: "Fashion",
      children: [
        { item: "Men Fashion" },
        { item: "Women fashion" },
        { item: "Kids fashion" },
      ],
    },
    { id: 12, item: "Beauty" },
  ];

  return (
    <>
      <nav className="container">
        <div className="row">
          <div className="col-md-3 col-sm-2 left-part">
            <Button className="category d-flex" onClick={handleCategory}>
              <div>
                <MenuIcon />
              </div>

              <span>all categories</span>
              <div>
                <ArrowDropDownIcon />
              </div>
            </Button>

            <div className="submenu shadow d-flex flex-column">
              {isOpenCategory ? (
                <CategoryDropDown productList={allCategory} />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-md-8 col-sm-5 right-part">
            <ul className="p-0">
              <li className="">
                <Link to={"/"}>
                  <Button>Home</Button>
                </Link>
              </li>

              <li className="">
                <Link to={"/"}>
                  <Button>Electronics</Button>
                </Link>
                {/* Submenu should not be inside <Link> */}
                <div className="submenu shadow">
                  <Link to={"/"}>
                    <Button>Mobiles</Button>
                  </Link>
                  <Link to={"/"}>
                    <Button>Laptops</Button>
                  </Link>
                  <Link to={"/"}>
                    <Button>SmartWatches</Button>
                  </Link>
                </div>
              </li>
              <li className="">
                <Link to={"/"}>
                  <Button>Footware</Button>
                </Link>
                <div className="submenu shadow">
                  <Link to={"/"}>
                    <Button>women footware</Button>
                  </Link>
                  <Link to={"/"}>
                    <Button>men footware</Button>
                  </Link>
                </div>
              </li>
              <li className="">
                <Link to={"/"}>
                  <Button>Fashion</Button>
                </Link>
                <div className="submenu shadow">
                  <Link to={"/"}>
                    <Button>men</Button>
                  </Link>
                  <Link to={"/"}>
                    <Button>women</Button>
                  </Link>
                </div>
              </li>
              <li className="">
                <Link to={"/"}>
                  <Button>Beauty</Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr />
    </>
  );
};

export default Navbar;
