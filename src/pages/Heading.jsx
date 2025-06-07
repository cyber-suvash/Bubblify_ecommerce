import Button from "@mui/material/Button";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContextAPI";

const Heading = () => {
  const { product, setProduct } = useContext(ProductContext);

  const menuItems = [...new Set(product.map((each) => each.category))];

  const [activeCategory, setActiveCategory] = useState("");

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-4 products-heading">
          <h3 className="mb-1">Top Products</h3>
        </div>
        <div className="col-md-8 products-menu">
          {menuItems.map((each) => (
            <Button
              key={each}
              className={each === activeCategory ? "active-btn" : ""}
            >
              {each}
            </Button>
          ))}
          <KeyboardDoubleArrowRightRoundedIcon sx={{ fontSize: "20px" }} />
        </div>
      </div>
    </div>
  );
};

export default Heading;
