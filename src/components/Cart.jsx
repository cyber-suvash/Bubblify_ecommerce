import React, { useState } from "react";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import QuantityBox from "./QuantityBox";
import { Button } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Data from "./Data";

const Cart = () => {
  return (
    <section className="cartpage">
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between">
            <h2>Cart</h2>
            <Link to={"/"}>
              <DisabledByDefaultIcon sx={{ fontSize: "2rem" }} />
            </Link>
          </div>

          <p>
            There are <b>2</b> items in your cart
          </p>
          <div className="col-md-8">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>product</th>
                  
                    <th>quantity</th>
                    <th>subtotal</th>
                    <th>remove</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td><img src={Data[0].image} alt="" /></td>
      
                    <td>
                      <QuantityBox />
                    </td>
                    <td>$150</td>
                    <td>
                      <Button>
                        <DeleteIcon sx={{ color: "crimson" }} />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td><img src={Data[2].image} alt="" /></td>
                  
                    <td>
                      <QuantityBox />
                    </td>
                    <td>$250</td>
                    <td>
                      <Button>
                        <DeleteIcon sx={{ color: "crimson" }} />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-4">
            <div className="shadow p-3 Cartdetails">
              <h3>Cart value</h3>
              <hr />
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span>Subtotal</span>
                <span className="ml-auto">$500</span>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span>Shipping</span>
                <span className="ml-auto">Free</span>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span>Estimate for</span>
                <span className="ml-auto">
                  <b>India</b>
                </span>
              </div>
              <hr />

              <div className="d-flex align-items-center justify-content-between mb-2">
                <span><b>Total</b></span>
                <span className="ml-auto"><b>$500</b></span>
              </div>

              <div className="card-buttons">
                <Button size="small">
             
                  <ShoppingCartCheckoutIcon />
                  Check out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
