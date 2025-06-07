import React, {useContext, useState} from "react";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { ProductContext } from "../context/ProductContextAPI";

const Review = () => {
  const {reviewSubmit,review,setReview}=useContext(ProductContext);

  const { id } = useParams();
  const inputChanges = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    reviewSubmit(id);
  }

  return (
    <div className="">
      <div className=" px-2 py-3 mt-3 border rounded">
        <h4>Review </h4>
        <form action="" onSubmit={handleSubmit}>
          {/* <div>
            <label htmlFor="rating" className="form-label">
              Rating: {review.rating} ⭐
            </label>
            <input
              type="range"
              min={1}
              max={5}
              id="rating"
              value={review.rating}
              onChange={inputChanges}
              name="rating"
            />
          </div> */}

         <Rating name="rating" value={review.rating} onChange={inputChanges}/>
          <div className=" mb-2">
            <label htmlFor="" className="form-label">
              Comments
            </label>
            <textarea
              type="text"
              name="comment"
              id="comments"
              rows={5}
              cols={1}
              placeholder="enter review"
              className="form-control"
              value={review.comment}
              onChange={inputChanges}
              required
            />
          </div>
          <Button variant="contained" type="submit">
            submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Review;
