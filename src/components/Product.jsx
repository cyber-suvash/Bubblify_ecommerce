import React, { useState } from "react";
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

const Product = ({ data }) => {
  const [wishlist, setWishlist] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Toggle wishlist for each product
  const handleWishlist = (id) => {
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

  return (
    <>
      <div className="productstab">
        {data.map((each) => (
          <Card sx={{ maxWidth: 240, padding: 1 }} className="card" key={each.id}>
            <CardMedia component="img" alt={each.title} image={each.image} />
            <div className="expand-whishlist">
              <OpenWithRoundedIcon fontSize="large" onClick={() => openProductModal(each)}  sx={{color:"green"}}/>
              {wishlist[each.id] ? (
                <FavoriteIcon fontSize="large" sx={{ color: "red" }} onClick={() => handleWishlist(each.id)} />
              ) : (
                <FavoriteBorderIcon fontSize="large" onClick={() => handleWishlist(each.id)} />
              )}
            </div>
            <CardContent sx={{padding:0}}>
              <Typography component="span">{each.desc.slice(0,16)}</Typography>
              <Typography variant="body2" color="success">
                In Stock
              </Typography>
              <Typography variant="body2">
                <Rating name="read-only" value={4} readOnly />
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "text.secondary" }}
              >
                <p className="mb-0 text-decoration-line-through">Rs {each.price} </p>
                <p className="price mb-0">Rs {each.discount}</p>
              </Typography>
              </CardContent>
            
            <div className="card-buttons mt-0">
              <Button size="small">
                <ShoppingCartIcon /> Buy Now
              </Button>
            </div>
            
          </Card>
        ))}
      </div>

      {/* Modal */}
      {isOpenModal && selectedProduct && (
        <Dialog open={isOpenModal} onClose={closeModal} sx={{padding:1}}>
          <div className="position-absolute top-0 start-0">
          <Button onClick={closeModal}>
            <CloseIcon fontSize="large" className="" sx={{color:"crimson"}} />
          </Button>

          </div>
          <img src={selectedProduct.image} alt={selectedProduct.title} height=""/>
          <div>
           <p className="mb-0">{selectedProduct.desc}</p>
            <Rating name="read-only" value={4} readOnly />
          </div>
          <div className="card-buttons">
            <Button size="small">
              <ShoppingCartIcon /> Buy Now
            </Button>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default Product;
