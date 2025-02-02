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



const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        
        <Home />
      
      </>
    ),
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
    path:"/signUp",
    element:(
      <>
       <Header/>
       <SignupForm/>
      </>
     
    )
  },
  ,{
    path:'/forgotpassword',
    element:(
      <>
      <Header/>
      <ForgotPass/>
      </>
    )
  },
  {
    path:"/cart",
    element:(
      <>
      <Header/>
      <Cart/>
      </>
     
    )
  },{path:'/wishlist',
    element:(
      <>
      <Header/>
      <Wishlist/>
      </>
    )
  }
]);

const App = () => {

  
 

  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
};

export default App;
