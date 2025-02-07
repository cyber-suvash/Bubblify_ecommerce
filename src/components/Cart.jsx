import React from "react";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import QuantityBox from "./QuantityBox";
import { Button } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const Cart = ({ addtoCart, setAddtoCart }) => {
  // Remove product from cart
  const removeProduct = (index) => {
    setAddtoCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Calculate subtotal dynamically
  const subtotal = addtoCart.reduce((acc, item) => acc + parseInt(item.discount), 0);

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
          {console.log(addtoCart)
          }

          {addtoCart.length > 0 ? (
            <>
            <p>You have <b>{addtoCart.length}</b> {addtoCart.length>1?"items":"item"} in your cart</p>
              {/* Cart Table */}
              <div className="col-md-8">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {addtoCart.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <img src={item.image} alt={item.title} width="50" />
                          </td>
                          <td>
                            <QuantityBox addtoCart={addtoCart}/>
                          </td>
                          <td>₹ {item.discount}</td>
                          <td>
                            <Button onClick={() => removeProduct(index)}>
                              <DeleteIcon sx={{ color: "crimson" }} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="col-md-4">
                <div className="shadow p-3 Cartdetails">
                  <h3>Cart Summary</h3>
                  <hr />
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span className="ml-auto">₹ {subtotal}</span>
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
                    <span>
                      <b>Total</b>
                    </span>
                    <span className="ml-auto">
                      <b>₹ {subtotal}</b>
                    </span>
                  </div>
                  <div className="card-buttons">
                    <Button size="small">
                      <ShoppingCartCheckoutIcon />
                      Check out
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="col-12 text-center">
              <h4>Your cart is empty 😔</h4>
              <Link to="/" className="btn btn-primary mt-3">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>

    </section>
  );
};

export default Cart;
