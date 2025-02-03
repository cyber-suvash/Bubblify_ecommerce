import React, { useState } from "react";
import Button from "@mui/material/Button";
import MailIcon from "@mui/icons-material/Mail";
import emailbanner from "../assets/photos/email-banner.png";
const Newsletter = () => {


  const [email,setEmail]=useState("")

  const handleEmail=(event)=>{
    setEmail(event.target.value)
  }
  return (
    <section className="newsletter-section mb-3 mt-3 d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-md-6 img-section">
            <img src={emailbanner} alt="" />
          </div>
          <div className="col-md-6">
            <p className="text-white mb-0">60% discount for your first order</p>
            <h3 className="text-white">Join our newsletter & get..</h3>
            <p className="text-light">
              Join our email subscription now to get updates on promotions and
              coupons.
            </p>
            <form className="subc-email">
              <MailIcon sx={{ color: "grey" }} />

              <input type="email" placeholder="put your email here" 
              aria-label="email"
              value={email}
              onChange={handleEmail}
              />
              <Button className="subc-button">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
