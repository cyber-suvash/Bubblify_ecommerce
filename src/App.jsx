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
import toast from 'react-hot-toast';

const App = () => {
  const [addtoCart, setAddtoCart] = useState([]);
   const [wishlist, setWishlist] = useState([]);
  
   const handleAddtoCart = (eachProduct) => {
    setAddtoCart((prevCart) =>
      prevCart.some((item) => item.id === eachProduct.id)
        ? prevCart.map((item) =>
            item.id === eachProduct.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevCart, { ...eachProduct, quantity: 1 }]
    );
    toast.success("Product added Successsfully!")
  };
  
  const handleWishlist = (eachProduct) => {
    setWishlist((prevWishlist) => {
      const isAlreadyInWishlist = prevWishlist.some((item) => item.id === eachProduct.id);
      if (isAlreadyInWishlist) {
        return prevWishlist.filter((item) => item.id !== eachProduct.id); // Remove if exists
      } else {
        return [...prevWishlist, eachProduct]; // Add if not exists
      }
    });
  };
  

  const routers = createBrowserRouter([
    {
      path: "/",
      element: 
      <Home addtoCart={addtoCart} handleAddtoCart={handleAddtoCart} 
      wishlist={wishlist} handleWishlist={handleWishlist}/>,
    },
    {
      path: "/login",
      element: (
        <>
          <Header addtoCart={addtoCart}/>
          <LoginForm />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Header addtoCart={addtoCart}/>
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
          <Header  addtoCart={addtoCart}/>
          <Cart addtoCart={addtoCart} setAddtoCart={setAddtoCart}/>
        </>
      ),
    },
    {
      path: "/wishlist",
      element: (
        <>
          <Header wishlist={wishlist} addtoCart={addtoCart}/>
          <Wishlist  wishlist={wishlist} handleWishlist={handleWishlist} 
          handleAddtoCart={handleAddtoCart}/>
        </>
      ),
    },
  ]);

  return <RouterProvider router={routers} />;
};

export default App;
