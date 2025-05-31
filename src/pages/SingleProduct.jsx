import { useContext, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { ProductContext } from "../context/ProductContextAPI";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CircularProgress from "@mui/material/CircularProgress";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import Forward10Icon from "@mui/icons-material/Forward10";
import Rating from "../components/Rating";
import SecurityIcon from "@mui/icons-material/Security";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormatPrice from "../helpers/FormatPrice";

const SingleProduct = () => {
  const { id } = useParams();
  const { product } = useContext(ProductContext);

  const [quantity, setQuantity] = useState(1);

  const setDecrease = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };
  const setIncrease = (stock) => {
    quantity < stock ? setQuantity(quantity + 1) : setQuantity(stock);
  };

  if (!product || product.length === 0) return <p>Product not found</p>;

  // Fix type mismatch
  const single = product.find((each) => each._id === id);

  console.log(single);
  if (!single) return <p>product not found</p>;

  return (
    <div className="container-fluid mt-5 py-4">
      <h5>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          Home
        </NavLink>
        /{single.category}/{single.product_name}
      </h5>
      <div className="mt-4 bg-succes d-flex justify-content-center gap-3 single-product">
        <div className="single-img">
          <img src={single.image} alt="" />
        </div>
        <div className="single-data">
          <h2>{single.product_name}</h2>
          <div className="mb-0">
            <Rating stars={4.5} />
          </div>
          <p className="mb-0">{single.category}</p>
          <p>
            Product Details:{" "}
            <span className="text-secondary">{single.description}</span>{" "}
          </p>
          <p>
            <strong>Price:</strong> <FormatPrice price={single.price} />
          </p>
          <div className="product-delivery d-flex justify-content-between text-secondary gap-3 ">
            <div>
              <LocalShippingIcon />
              <p>Free delivery</p>
            </div>
            <div>
              <Forward10Icon />
              <p>10 days return</p>
            </div>
            <div>
              <SecurityIcon />
              <p>1 year warranty</p>
            </div>
          </div>
          <hr />
          <div className="product-info">
            <p>
              Availability:{" "}
              {single.availability ? (
                <span className="text-success">In Stock</span>
              ) : (
                <span className="text-danger">Out of Stock</span>
              )}
            </p>
            <p>Product Id: {single._id}</p>
            <div className="QuantityBox">
              <Button onClick={setDecrease}>
                <RemoveCircleIcon fontSize="small" />
              </Button>
              <div className="text-center">{quantity}</div>
              <Button onClick={() => setIncrease(single.availability)}>
                <AddCircleIcon fontSize="small" />
              </Button>
            </div>

            <div className="card-buttons mt-0 ">
              <Button size="small">
                {" "}
                <AddShoppingCartIcon /> Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleProduct;
