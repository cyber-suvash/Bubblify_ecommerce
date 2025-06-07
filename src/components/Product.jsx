import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ProductContext } from "../context/ProductContextAPI";
import CircularProgress from "@mui/material/CircularProgress";
import { NavLink } from "react-router-dom";
import FormatPrice from "../helpers/FormatPrice";


const Product = ({ wishlist, handleWishlist }) => {
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

  const { product, loader} = useContext(ProductContext);

  return (
    <>
      {loader ? (
        <div className="d-flex justify-content-center align-items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="productstab">
          {product.map((each) => (
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
                <Typography
                  variant="body2"
                  className={
                    each.availability > 0
                      ? "text-success mb-0"
                      : "text-danger mb-0"
                  }
                >
                  {each.availability > 0 ? "In Stock" : "Out of Stock"}
                </Typography>
                <Typography variant="body2">
                  <Rating name="read-only" value={4} readOnly />
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "text.secondary" }}
                  className="text-decoration-line-through"
                >
                  <FormatPrice price={each.price} />
                </Typography>
                <Typography variant="h6" sx={{ color: "crimson" }}>
                  <FormatPrice price={each.price} />
                </Typography>
              </CardContent>
              <div className="card-buttons mt-0">
                <NavLink to={`/singleproduct/${each._id}`}>
                  {" "}
                  <Button>details</Button>
                </NavLink>
              </div>
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
