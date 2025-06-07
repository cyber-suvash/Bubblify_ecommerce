import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailIcon from "@mui/icons-material/Mail";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { Button } from "@mui/material";
const Foooter2 = () => {
  return (
    <>
      <div className="container mb-5">
        <div className="row d-flex justify-content-between">
          <div className="col-md-3 address">
            <div className="info">
              <p>Trendy shooping market</p>
              <LocationOnIcon style={{ color: "green" }} />
              <span>
                <b>Address:</b> 5171 W Campbell Ave undefined Kent,
                Utah,53127,United States
              </span>
            </div>
            <div className="info">
              <WhatsAppIcon style={{ color: "green" }} />
              <span>
                <b>Whatsapp us</b>:(+91) - 540-025-124553{" "}
              </span>
            </div>

            <div className="info">
              <MailIcon style={{ color: "green" }} />
              <span>
                <b>Mail us:</b>bubblify@xyz.com
              </span>
            </div>
            <div className="info">
              <QueryBuilderIcon style={{ color: "green" }} />
              <span>
                <b>Hours</b>:10:00 -18:00 Mon-Sat
              </span>
            </div>
          </div>

          <div className="col-md-2 contact">
            <p>company</p>
            <span>about us</span>
            <span>delivery information</span>
            <span>privacy policy</span>
            <span>terms & condition</span>
            <span>contact us</span>
            <span>support center</span>
          </div>
          <div className="col-md-2 contact">
            <p>company</p>
            <span>about us</span>
            <span>delivery information</span>
            <span>privacy policy</span>
            <span>terms & condition</span>
            <span>contact us</span>
            <span>support center</span>
          </div>
          <div className="col-md-2 contact">
            <p>company</p>
            <span>about us</span>
            <span>delivery information</span>
            <span>privacy policy</span>
            <span>terms & condition</span>
            <span>contact us</span>
            <span>support center</span>
          </div>
          <div className="col-md-2 contact">
            <p>company</p>
            <span>about us</span>
            <span>delivery information</span>
            <span>privacy policy</span>
            <span>terms & condition</span>
            <span>contact us</span>
            <span>support center</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Foooter2;
