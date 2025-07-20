import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import google from "/photos/google.png";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const LoginForm = ({ setUser, setIsLoggedIn }) => {
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
        {
          withCredentials: true,
        }
      );
        console.log(response)
      if (response.status === 200 && response.data) {
        const { user: userData } = response.data;
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/user/profile`,
          { withCredentials: true } //use cookies
        );
        console.log(res);
        if (res.data?.user) {
          setIsLoggedIn(true);
          setUser(res.data.user);
          toast.success(`Welcome back ${res.data?.user.fullname}`, {
            id: toastID,
          });
          // ✅ Clear form data
          setLogdata({ email: "", password: "" });
        }

        // Navigate based on user role
        if (res.data?.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Login succeeded but user missing", { id: toastID });
      }
    } catch (error) {
      console.error("Login error:", error);

      toast.error(error.response?.data?.msg || "Login failed. Try again.", {
        id: toastID,
      });
    } finally {
      setIsloader(false);
    }
  };

  return (
    <>
      <div className="outer min-vh-100">
        <div className="row ">
          <div className="col-md-6 col-lg-4 main text-center main-outer">
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
                disabled={isloader}
                autoComplete="email"
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="standard"
                type="password"
                value={logData.password}
                onChange={handleLoginForm}
                disabled={isloader}
                autoComplete="current-password"
              />
              <Link to={"/forgotpassword"}>
                <span>Forgot password?</span>
              </Link>

              <div className="signin-btn">
                <Button type="submit" disabled={isloader} variant="contained">
                  {isloader ? "Logging in..." : "Sign In"}
                </Button>
                <span>or</span>
                <Button disabled={isloader}>
                  <img src={google} alt="Google" />
                  Sign in with Google
                </Button>
              </div>

              <div className="main-last">
                <p>
                  Don't have an account?{" "}
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
