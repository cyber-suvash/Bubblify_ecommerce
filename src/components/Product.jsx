import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import OpenWithRoundedIcon from "@mui/icons-material/OpenWithRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Dialog from "@mui/material/Dialog";
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import product1 from "../assets/photos/pic1.jpg"
const Product = () => {

  const [wishlist,setWishlist]=useState(false)
  const handleWishlist=()=>{
    setWishlist((prev)=>!prev)
  }

const [isOpenModal,setIsopenModal]=useState(false)
const openProductModal=(id)=>{
  setIsopenModal(true)

}
const closeModal=()=>{
  setIsopenModal(false)
}


  return (

    <>
    
    <Card sx={{ maxWidth: 240, padding: 1 }} className="card">
      <CardMedia
        component="img"
        alt="t-shirt"
        image={product1}
      />
      <div className="expand-whishlist ">
        <OpenWithRoundedIcon fontSize="large"  onClick={()=>openProductModal(1)}/>
        {wishlist? <FavoriteIcon  fontSize="large" sx={{color:"red"}} onClick={handleWishlist}/>   :<FavoriteBorderIcon fontSize="large"  onClick={handleWishlist}/>}
      </div>
      <CardContent>
        <Typography component="span">
        GESPO Peach Solid Mandarin Collar
        </Typography>
        <Typography variant="body2" color="success">
          In Stock
        </Typography>
        <Typography>
          <Rating name="read-only" value={4} readOnly />
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "text.secondary" }}
          className="d-flex align-items-center mb-0 price"
        >
          <p className="mb-0 me-2 text-decoration-line-through">Rs 2999 </p>
          <span className=" mb-0">Rs 899</span>
        </Typography>
      </CardContent>
      <div className="card-buttons mt-0">
        <Button size="small"> <ShoppingCartIcon/>buy now</Button>
      </div>
    </Card>

    {isOpenModal===true && <Dialog open={true} onClose={()=>closeModal(1)}>
     <Button onClick={closeModal}>
     <CloseIcon fontSize="large"/>
      </Button> 

   
    <img src={product1} alt="" />
    <div className="card-buttons">
        <Button size="small"> <ShoppingCartIcon/>buy now</Button>
      </div>
   
      
      </Dialog>}

    </>
  );
};

export default Product;
