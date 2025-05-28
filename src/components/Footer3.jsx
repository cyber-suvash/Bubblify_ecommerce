import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
const Footer3 = () => {
  return (
    <div className="container foot3">
      <div className="row d-flex justify-content-between">
        <div className="col-md-3 col-sm-6 foot ">

         <p className="mb-0">folllow us</p>
         <div className="foot-icon">
         <span>
            <FacebookIcon />
          </span>
          <span>
            <TwitterIcon />
          </span>
          <span>
            <InstagramIcon />
          </span>
          <span>
            <TelegramIcon />
          </span>
         </div>
          
        </div>

        <div className="col-md-4 d-flex align-items-end">
          <p className="copyright">© 2025, Bubblify Ecommerce All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer3;
