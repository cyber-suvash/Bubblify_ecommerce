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

const App = () => {
  const [addtoCart, setAddtoCart] = useState([]);
  
  const handleAddtoCart = (eachProduct) => {
    setAddtoCart((prevCart) => [...prevCart,eachProduct]);
    alert('Product added successfully')
  }

  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Home addtoCart={addtoCart} handleAddtoCart={handleAddtoCart} />,
    },
    {
      path: "/login",
      element: (
        <>
          <Header/>
          <LoginForm />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Header />
          <SignupForm />
        </>
      ),
    },
    {
      path: "/forgotpassword",
      element: (
        <>
          <Header />
          <ForgotPass />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <Header />
          <Cart addtoCart={addtoCart} setAddtoCart={setAddtoCart}/>
        </>
      ),
    },
    {
      path: "/wishlist",
      element: (
        <>
          <Header />
          <Wishlist />
        </>
      ),
    },
  ]);

  return <RouterProvider router={routers} />;
};

export default App;
