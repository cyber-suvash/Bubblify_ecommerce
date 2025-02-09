import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";
import SignupForm from "./components/SignupForm";
import Cart from "./components/Cart";
import Header from "./components/Header";
import ForgotPass from "./components/ForgotPass";
import Wishlist from "./components/Wishlist";
import toast from "react-hot-toast";

const App = () => {
  // Initialize state from localStorage or empty array if no data exists
  const [addtoCart, setAddtoCart] = useState(() => {
    const savedCart = localStorage.getItem("Localcart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("Localcart", JSON.stringify(addtoCart));
  }, [addtoCart]);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const handleAddtoCart = (eachProduct) => {
    setAddtoCart((prevCart) => {
      const updatedCart = prevCart.some((item) => item.id === eachProduct.id)
        ? prevCart.map((item) =>
            item.id === eachProduct.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...eachProduct, quantity: 1 }];

      return updatedCart;
    });
    toast.success("Product added Successfully!");
  };

  const handleWishlist = (eachProduct) => {
    setWishlist((prevWishlist) => {
      const isAlreadyInWishlist = prevWishlist.some(
        (item) => item.id === eachProduct.id
      );

      const updatedWishlist = isAlreadyInWishlist
        ? prevWishlist.filter((item) => item.id !== eachProduct.id)
        : [...prevWishlist, eachProduct];

      return updatedWishlist;
    });
  };

  const routers = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          addtoCart={addtoCart}
          handleAddtoCart={handleAddtoCart}
          wishlist={wishlist}
          handleWishlist={handleWishlist}
        />
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Header addtoCart={addtoCart} />
          <LoginForm />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Header addtoCart={addtoCart} />
          <SignupForm />
        </>
      ),
    },
    {
      path: "/forgotpassword",
      element: (
        <>
          <Header addtoCart={addtoCart} />
          <ForgotPass />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <Header addtoCart={addtoCart} />
          <Cart addtoCart={addtoCart} setAddtoCart={setAddtoCart} />
        </>
      ),
    },
    {
      path: "/wishlist",
      element: (
        <>
          <Header wishlist={wishlist} addtoCart={addtoCart} />
          <Wishlist
            wishlist={wishlist}
            handleWishlist={handleWishlist}
            handleAddtoCart={handleAddtoCart}
          />
        </>
      ),
    },
  ]);

  return <RouterProvider router={routers} />;
};

export default App;
