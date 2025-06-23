// App.jsx
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect, useState, useContext } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import AppLayout from "./components/Layout/AppLayout";
import Listing from "./admin/Listing";
import Customers from "./pages/Customers";
import Orders from "./components/Orders";
import History from "./components/History";
import SingleProduct from "./pages/SingleProduct";
import { Toaster } from "react-hot-toast";
import axios from "axios";

const App = () => {
  // const [user, setUser] = useState(() => {
  //   const data = localStorage.getItem("keepLoggedIn");
  //   return data ? JSON.parse(data) : null;
  // });
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  console.log(isLoggedIn);
  // const handleLogout = () => {
  //   const toastID = toast.loading("logging out..");
  //   setTimeout(() => {
  //     localStorage.removeItem("keepLoggedIn");
  //     localStorage.removeItem("token");
  //     setUser(null);
  //     setProfile_img(null);
  //     toast.success("Success", { id: toastID });
  //   }, 1000);
  // };
  const [loading, setLoading] = useState(true); // New

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/user/profile`,
          { withCredentials: true }
        );
        console.log(res);
        if (res.data?.user) {
          setUser(res.data.user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    const toastID = toast.loading("Logging out...");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/logout`,
        {}, // no body
        {
          withCredentials: true, // ✅ this ensures cookies are sent
        }
      );
      setUser(null);
      setIsLoggedIn(false);
      toast.success(res.data.msg, { id: toastID });
    } catch (error) {
      console.error(error);
      toast.error("Logout failed", { id: toastID });
    }
  };

  const handleWishlist = (eachProduct) => {};

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
          element: !isLoggedIn ? (
            <LoginForm
              setUser={setUser}
              User={user}
              setIsLoggedIn={setIsLoggedIn}
            />
          ) : (
            <Navigate to={"/"} />
          ),
        },
        {
          path: "signup",
          element: !isLoggedIn ? <SignupForm /> : <Navigate to={"/"} />,
        },
        {
          path: "forgotpassword",
          element: <ForgotPass />,
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
            <ProtectedRoutes
              isLoggedIn={isLoggedIn}
              user={user}
              roles={["user", "admin"]}
            >
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
      path: "/admin",
      element: (
        <ProtectedRoutes isLoggedIn={isLoggedIn} user={user} roles={["admin"]}>
          <AdminDashboard
            user={user}
            handleLogout={handleLogout}
            profile_img={profile_img}
          />
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
      path: "/unauthorized",
      element: <h3>Unauthorized access</h3>,
    },

    {
      path: "*",
      element: <LoginForm />,
    },
  ]);

  return (
    <>
      <Toaster position="top-center" />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <CircularProgress />
        </div>
      ) : (
        <RouterProvider router={routers} />
      )}
    </>
  );
};

export default App;
