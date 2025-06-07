import React from "react";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";

const Rating = ({ stars, reviews }) => {
  // generate sequence number
  const ratingStar = Array.from({ length: 5 }, (element, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <StarIcon style={{ color: "gold" }} />
        ) : stars >= number ? (
          <StarHalfIcon style={{ color: "gold" }} />
        ) : (
          <StarOutlineIcon />
        )}
      </span>
    );
  });

  return (
    <div>
      {stars}{ratingStar}
      <p className="mb-0">{reviews}</p>
    </div>
  );
};

export default Rating;
