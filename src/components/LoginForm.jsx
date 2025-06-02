import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import logo from "/photos/logo.png";
import google from "/photos/google.png";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const LoginForm = ({ setUser }) => {
  const [logData, setLogdata] = useState({ email: "", password: "" });

  const [isloader, setIsloader] = useState(false);

  const navigate = useNavigate();

  const handleLoginForm = (event) => {
    const { name, value } = event.target;
    setLogdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!logData.email.trim() || !logData.password.trim()) {
      toast.error("Please enter both email and password");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(logData.email)) {
      toast.error("Invalid Email");
      return;
    }

    const toastID = toast.loading("Logging in...");

    try {
      setIsloader(true);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/login`,
        {
          email: logData.email.toLowerCase(),
          password: logData.password,
        },
        { withCredentials: true }
      );

      if (response.status === 200 && response.data.user) {
        const user = response.data.user;
        localStorage.setItem("keepLoggedIn", JSON.stringify(user));
        setUser(user);
        toast.success(`Welcome back ${user.fullname}`, { id: toastID });

          // Navigate based on user role
        if (user.isAdmin===true) {
          navigate('/admin-dashboard');
        } else {
          navigate('/profile');
        }
      } else {
        toast.error("Login failed, try again later", { id: toastID });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "An error occurred during login.",
        { id: toastID }
      );
      console.error("Login error:", error);
    } finally {
      setIsloader(false);
    }
  };

  return (
    <>
      <div className="outer min-vh-100">
        <div className="row">
          <div className="col-md-6 col-lg-4 main text-center main-outer">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="cancel">
              <Link to={"/"}>
                <DisabledByDefaultIcon fontSize="large" />
              </Link>
            </div>
            <h3>Sign In</h3>

            <form onSubmit={handleLogin} className="login-form">
              <TextField
                id="email"
                name="email"
                label="Enter Email"
                variant="standard"
                value={logData.email}
                onChange={handleLoginForm}
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="standard"
                type="password"
                value={logData.password}
                onChange={handleLoginForm}
              />
              <Link to={"/forgotpassword"}>
                <span>Forgot password?</span>
              </Link>

              <div className="signin-btn">
                <Button type="submit">
                  {isloader ? "loading...." : "sign in"}
                </Button>
                <span>or</span>
                <Button>
                  <img src={google} alt="" />
                  Sign in with Google
                </Button>
              </div>

              <div className="main-last">
                <p>
                  Don’t have an account?{" "}
                  <Link to={"/signup"}>
                    <span>Signup</span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
