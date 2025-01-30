import React from "react";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { Link } from "react-router-dom";
const Cart = () => {
  return (
    <section className="cartpage">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="d-flex justify-content-between"> 
            <h2>Cart</h2>
            <Link to={"/"}>
            <DisabledByDefaultIcon />
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
                    <td>$10</td>
                    <td>1</td>
                    <td>$10</td>
                    <td>
                      <button>Remove</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Example Product2</td>
                    <td>$20</td>
                    <td>2</td>
                    <td>$40</td>
                    <td>
                      <button>Remove</button>
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
