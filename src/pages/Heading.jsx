import Button from "@mui/material/Button";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import Data from "../components/Data.js";

const ProductsPage = ({ viewAll, filteredData, activeCategory }) => {
  const menuItems = [...new Set(Data.map((each) => each.category))];

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
              onClick={() => filteredData(each)}
              className={each === activeCategory ? "active-btn" : ""}
            >
              {each}
            </Button>
          ))}
           <Button className="" onClick={viewAll}>
            <KeyboardDoubleArrowRightRoundedIcon sx={{fontSize:'20px'}} />
          </Button>
           
        </div>
       
      </div>
    </div>
  );
};

export default ProductsPage;
