import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const CategoryDropDown = ({ productList }) => {
  return (
    <>
      
        {productList.map((each) => (
          <li key={each.id}>
            <Link to={"/"}>
              <Button>{each.item}</Button>
            </Link>
          </li>
        ))}
    
    </>
  );
};

export default CategoryDropDown;
