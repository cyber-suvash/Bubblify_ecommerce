import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import OpenWithRoundedIcon from "@mui/icons-material/OpenWithRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ProductContext } from "../context/ProductContextAPI";
import CircularProgress from "@mui/material/CircularProgress";
import { NavLink } from "react-router-dom";
import FormatPrice from "../helpers/FormatPrice";

const Product = ({ data, handleAddtoCart, wishlist, handleWishlist }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Open product modal dynamically
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsOpenModal(true);
  };

  // Close modal
  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedProduct(null);
  };

  const { product, load } = useContext(ProductContext);

  return (
    <>
      {load ? (
        <div className="d-flex justify-content-center align-items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="productstab">
          {product?.map((each) => (
            <Card
              sx={{ maxWidth: 240, padding: 1 }}
              className="card"
              key={each._id}
            >
              <CardMedia component="img" alt={each.title} image={each.image} />

              <div className="expand-whishlist">
               
                {wishlist.some((item) => item.id === each.id) ? (
                  <FavoriteIcon
                    fontSize="large"
                    sx={{ color: "red" }}
                    onClick={() => handleWishlist(each)}
                  />
                ) : (
                  <FavoriteBorderIcon
                    fontSize="large"
                    onClick={() => handleWishlist(each)}
                  />
                )}
              </div>
              <CardContent sx={{ padding: 0 }}>
                {/* <Typography component="span">{each.desc.slice(0, 16)}</Typography> */}
                <Typography variant="body2" color="success">
                  {each.availability > 0 ? "In stock" : "out of stock"}
                </Typography>
                <Typography variant="body2">
                  <Rating name="read-only" value={4} readOnly />
                </Typography>
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                  <p className="mb-0 text-decoration-line-through">
                    <FormatPrice price={each.price} />
                  </p>
                  <p className="price mb-0">
                    <FormatPrice price={each.price} />
                  </p>
                </Typography>
              </CardContent>
              <div className="card-buttons mt-0">
                <NavLink to={`/singleproduct/${each._id}`}>
                  {" "}
                  <Button>details</Button>
                </NavLink>
              </div>

              {/* <div className="card-buttons mt-0">
                  <Button size="small" onClick={() => handleAddtoCart(each)}>
                    <ShoppingCartIcon />
                  </Button> 
                </div> */}
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      {/* {isOpenModal && selectedProduct && (
        <Dialog open={isOpenModal} onClose={closeModal} sx={{ padding: 1 }}>
          <div className="position-absolute top-0 start-0">
            <Button onClick={closeModal}>
              <CloseIcon
                fontSize="large"
                className=""
                sx={{ color: "crimson" }}
              />
            </Button>
          </div>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            height=""
          />
          <div>
            <p className="mb-0">{selectedProduct.desc}</p>
            <Rating name="read-only" value={4} readOnly />
          </div>
          <div className="card-buttons">
            <Button
              size="small"
              onClick={() => handleAddtoCart(selectedProduct)}
            >
              <ShoppingCartIcon /> Buy Now
            </Button>
          </div>
        </Dialog>
      )} */}
    </>
  );
};

export default Product;
