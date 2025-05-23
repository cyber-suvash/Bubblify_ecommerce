import React from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useEffect, useState, useRef } from "react";

const imagefiles = [
  "https://cmsimages.shoppersstop.com/eoss_main_banner_web_56324b74ba/eoss_main_banner_web_56324b74ba.png",
  "https://cmsimages.shoppersstop.com/bargain_web_4b36fbd532/bargain_web_4b36fbd532.png",
  "https://cmsimages.shoppersstop.com/Sketchers_web_85af1f4340/Sketchers_web_85af1f4340.png",
  "https://cmsimages.shoppersstop.com/main_banner_web_Fashor_W_and_more_f7053a6d63/main_banner_web_Fashor_W_and_more_f7053a6d63.png",
];

const HomeBanner = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef(null);

  const handleLeftImages = () => {
    setCurrentImage(
      (prev) => (prev - 1 + imagefiles.length) % imagefiles.length
    );
  };
  const handleRightImages = () => {
    setCurrentImage((prev) => (prev + 1) % imagefiles.length);
  };

  const startSliding = () => {
    intervalRef.current = setInterval(() => {
      handleRightImages();
    }, 4000);
  };
  const stopSliding = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startSliding();
    return () => stopSliding();
  }, []);

  return (
    <>
      <div>
        <div
          className="slider-container mb-3 mt-5 p-2"
          onMouseEnter={stopSliding}
          onMouseLeave={startSliding}
        >
          <ArrowCircleLeftIcon
            className="left-arrow"
            onClick={handleLeftImages}
          />

          <div className="image-container">
            {imagefiles.map((each, index) => (
              <img
                key={index}
                src={each}
                alt={`Slider ${each + 1}`}
                className={`slide ${
                  currentImage === index ? "activeSlider" : ""
                }`}
              />
            ))}
          </div>

          <ArrowCircleRightIcon
            className="right-arrow"
            onClick={handleRightImages}
          />
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
