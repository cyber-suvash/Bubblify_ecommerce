import { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { ProductContext } from "../context/ProductContextAPI";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import Forward10Icon from "@mui/icons-material/Forward10";
import Rating from "../components/RatingCustom";
import SecurityIcon from "@mui/icons-material/Security";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormatPrice from "../helpers/FormatPrice";
import Review from "../components/Review";
import CircularProgress from "@mui/material/CircularProgress";


const SingleProduct = ({ user }) => {
  const { id } = useParams();
  const { handleAddtoCart,product,loader ,OneProductFetch,oneProduct} = useContext(ProductContext);

  const [quantity, setQuantity] = useState(1);

  const setDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const setIncrease = (stock) => {
    quantity < stock ? setQuantity(quantity + 1) : setQuantity(stock);
  };
     useEffect(() => {
    OneProductFetch(id);
  }, [product]);

  if (!oneProduct || oneProduct.length === 0) return <p>Product not found</p>;

  return (
    <>
      {loader ? (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <CircularProgress />
        </div>
      ) : (
        <div className="container-fluid mt-5 py-4">
          <h5>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              Home
            </NavLink>
            /{oneProduct.category}/{oneProduct.product_name}
          </h5>
          <div className="mt-4 row">
            <div className="single-img col-md-5">
              <img src={oneProduct.image} alt="" />
            </div>
            <div className="single-data col-md-4">
              <h3>{oneProduct.product_name}</h3>
              <div className="mb-0">
                <Rating stars={4.5} />
              </div>
              <p className="mb-0 fs-4 text-primary">{oneProduct.category}</p>
              <p>
                Product Details:{" "}
                <span className="text-secondary">{oneProduct.description}</span>{" "}
              </p>
              <p className="fs-4">
                <strong>Price:</strong> <FormatPrice price={oneProduct.price} />
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
                  {oneProduct.availability ? (
                    <span className="text-success">In Stock</span>
                  ) : (
                    <span className="text-danger">Out of Stock</span>
                  )}
                </p>
                <p>Product Id: {oneProduct._id}</p>
                <div className="QuantityBox">
                  <Button onClick={setDecrease}>
                    <RemoveCircleIcon fontSize="small" />
                  </Button>
                  <div>
                    <span className="text-black">{quantity}</span>
                  </div>
                  <Button onClick={() => setIncrease(oneProduct.availability)}>
                    <AddCircleIcon fontSize="small" />
                  </Button>
                </div>

                <div className="card-buttons mt-0 ">
                  <Button
                    size="small"
                    onClick={() => handleAddtoCart({ ...oneProduct, quantity })}
                  >
                    <AddShoppingCartIcon /> Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row container">
            <div className="col-md-8">
              <p>All Reviews</p>
              <div className="row">
                {oneProduct.reviews.map((item, idx) => (
                  <div
                    key={idx}
                    className="cards ms-2 mt-2 p-1 col-md-5 rounded text-center"
                  >
                    <div className="card-body">
                      <h5 className="card-title">{user?.fullname}</h5>
                      <Rating stars={item.rating} />
                      <p className="mb-0 card-text text-secondary">
                        {item.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <Review />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SingleProduct;
