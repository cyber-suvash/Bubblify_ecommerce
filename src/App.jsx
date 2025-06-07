// App.jsx
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Home } from "./pages/Home";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Cart from "./components/Cart";
import ForgotPass from "./components/ForgotPass";
import Wishlist from "./components/Wishlist";
import AdminDashboard from "./admin/Admin";
import UserDashboard from "./pages/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AppLayout from "./components/Layout/AppLayout";
import Listing from "./admin/Listing";
import Customers from "./pages/Customers";
import Orders from "./components/Orders";
import History from "./components/History";
import SingleProduct from "./pages/SingleProduct";
import { Toaster } from "react-hot-toast";

const App = () => {


  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("keepLoggedIn");
    return data ? JSON.parse(data) : null;
  });
  const [profile_img, setProfile_img] = useState(null);

  //  geting profile image
  const getImages = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/images/${user._id}`
      );
      const result = await response.json();
      if (response.ok && result.data) {
        const imageURl = `${import.meta.env.VITE_SERVER_URL}/uploads/${
          result.data.filename
        }`;
        setProfile_img(imageURl);
      } else {
        setProfile_img(null);
      }
    } catch (error) {
      toast.error("Internal fetching error");
      console.log("error fetching", error);
      setProfile_img(null);
    }
  };

  const isLoggedIn = !!user;

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user?._id) {
      getImages();
    }
  }, [user]);

  const handleLogout = () => {
    toast.success("Logging out...");
    setTimeout(() => {
      localStorage.removeItem("keepLoggedIn");
      setUser(null);
      setProfile_img(null);
    }, 1000);
  };

  const handleWishlist = (eachProduct) => {
  
  };

  const routers = createBrowserRouter([
    {
      path: "/",
      element: (
        <AppLayout
          wishlist={wishlist}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          setUser={setUser}
          user={user}
          profile_img={profile_img}
        />
      ),
      children: [
        {
          path: "/",
          element: <Home wishlist={wishlist} handleWishlist={handleWishlist} />,
        },
        {
          path: "login",
          element: isLoggedIn ? (
            user?.isAdmin === true ? (
              <Navigate to={"/admin-dashboard"} />
            ) : (
              <Navigate to="/profile" />
            )
          ) : (
            <>
              <LoginForm
                isLoggedIn={isLoggedIn}
                setUser={setUser}
                User={user}
              />
            </>
          ),
        },
        {
          path: "signup",
          element: isLoggedIn ? (
            <Navigate to={"/"} />
          ) : (
            <>
              <SignupForm />
            </>
          ),
        },
        {
          path: "forgotpassword",
          element: isLoggedIn ? <ForgotPass /> : <Navigate to={"/login"} />,
        },
        {
          path: "cart",
          element: (
            <>
              <Cart />
            </>
          ),
        },
        {
          path: "singleproduct/:id",
          element: <SingleProduct user={user} />,
        },
        {
          path: "wishlist",
          element: (
            <>
              <Wishlist wishlist={wishlist} handleWishlist={handleWishlist} />
            </>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoutes isLoggedIn={isLoggedIn} user={user}>
              <UserDashboard
                user={user}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                setUser={setUser}
                profile_img={profile_img}
                getImages={getImages}
                setProfile_img={setProfile_img}
              />
            </ProtectedRoutes>
          ),
        },
      ],
    },

    {
      path: "/admin-dashboard",
      element: (
        <ProtectedRoutes
          isLoggedIn={isLoggedIn && user.isAdmin === true}
          user={user}
        >
          <AdminDashboard user={user} handleLogout={handleLogout}  profile_img={profile_img}/>
        </ProtectedRoutes>
      ),
      children: [
        {
          path: "products",
          element: <Listing />,
        },
        {
          path: "customers",
          element: <Customers />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "history",
          element: <History />,
        },
      ],
    },
    {
      path: "*",
      element: <h2>Page not found</h2>,
    },
  ]);

  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={routers} />
    </>
  );
};

export default App;
