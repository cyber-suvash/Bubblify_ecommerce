import React, { useState } from "react";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import QuantityBox from "./QuantityBox";
import { Button } from '@mui/material';
const Cart = () => {







  return (
    <section className="cartpage">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="d-flex justify-content-between"> 
            <h2>Cart</h2>
            <Link to={"/"}>
            <DisabledByDefaultIcon sx={{fontSize:"2rem"}}/>
            </Link>
           
            </div>
           
            <p>
              There are <b>2</b> items in your cart
            </p>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>product</th>
                    <th>price</th>
                    <th>quantity</th>
                    <th>subtotal</th>
                    <th>remove</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Example Product1</td>
                    <td>$40</td>
                    <td><QuantityBox/></td>
                    <td>$40</td>
                    <td>
                      <Button><DeleteIcon sx={{color:"crimson"}}/></Button>
                    </td>
                  </tr>
                  <tr>
                    <td>Example Product2</td>
                    <td>$20</td>
                    <td><QuantityBox/></td>
                    <td>$20</td>
                    <td>
                      <Button><DeleteIcon sx={{color:"crimson"}}/></Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
