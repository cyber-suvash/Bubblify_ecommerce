import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import OpenWithRoundedIcon from "@mui/icons-material/OpenWithRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Dialog from "@mui/material/Dialog";
const Product = () => {


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
        alt="green iguana"
        image="https://api.spicezgold.com/download/file_1734526836569_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-0-202403231855.jpg"
      />
      <div className="expand-whishlist ">
        <OpenWithRoundedIcon fontSize="large"  onClick={()=>openProductModal(1)}/>
        <FavoriteBorderIcon fontSize="large" color="red" />
      </div>
      <CardContent>
        <Typography component="p">
          Cotton Co Ord Set-Tie & Dye....
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
          <span className="mb-0 me-2 text-decoration-line-through">Rs 2999 </span>
          <p className=" mb-0">Rs 899</p>
        </Typography>
      </CardContent>
      <div className="card-buttons mt-0">
        <Button size="small">add to cart</Button>
        <Button size="small">buy now</Button>
      </div>
    </Card>

    {isOpenModal===true && <Dialog open={true} onClose={()=>closeModal(1)}><OpenWithRoundedIcon></OpenWithRoundedIcon></Dialog>}

    </>
  );
};

export default Product;
