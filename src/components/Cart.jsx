import React, { useEffect, useContext } from "react";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";
import { ProductContext } from "../context/ProductContextAPI";
import FormatPrice from "../helpers/FormatPrice";

const Cart = () => {
  const { setIncrease, setDecrease, addtoCart, setAddtoCart } =
    useContext(ProductContext);
  // Remove product from cart
  const removeProduct = (index) => {
    setAddtoCart((prev) => prev.filter((_, i) => i !== index));
    console.log(index)
    toast.error("Product Removed from cart", { duration: 1500 });
  };

  // Calculate subtotal dynamically
  const subtotal = addtoCart.reduce(
    (acc, item) => acc + parseInt(item.price * item.quantity),
    0
  );
  // Increment
  // const handleIncrement = (id) => {
  //   setAddtoCart((previtem) =>
  //     previtem.map((each) =>
  //       each.id === id ? { ...each, quantity: each.quantity + 1 } : each
  //     )
  //   );
  // };
  // Decrement
  // const handleDecrement = (id) => {
  //   setAddtoCart((previtem) =>
  //     previtem.map((each) =>
  //       each.id === id && each.quantity > 1
  //         ? { ...each, quantity: each.quantity - 1 }
  //         : each
  //     )
  //   );
  // };

  // save using localstorage

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
          {addtoCart.length > 0 ? (
            <>
              <p>
                You have <b>{addtoCart.length}</b>{" "}
                {addtoCart.length > 1 ? "items" : "item"} in your cart
              </p>
              {/* Cart Table */}
              <div className="col-md-7">
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
                            <img src={item.image.url} alt={item.title} width="50" />
                          </td>
                          <td>
                            <div className="QuantityBox">
                              <Button onClick={() => setDecrease(item._id)}>
                                <RemoveCircleIcon fontSize="small" />
                              </Button>
                              <div>{item.quantity}</div>
                              <Button
                                onClick={() =>
                                  setIncrease(item.availability, item._id)
                                }
                              >
                                <AddCircleIcon fontSize="small" />
                              </Button>
                            </div>
                          </td>
                          <td><FormatPrice price={item.price*item.quantity}/></td>
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
              <div className="col-md-3">
                <div className="shadow p-3 Cartdetails rounded">
                  <h3>Cart Summary</h3>
                  <hr />
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span className="ml-auto"><FormatPrice price={subtotal}/></span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span>Shipping</span>
                    <span className="ml-auto">{}</span>
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
                      <b>Grand Total</b>
                    </span>
                    <span className="ml-auto">
                      <b><FormatPrice price={subtotal}/></b>
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
            <div className="col-12 text-center mt-4">
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
