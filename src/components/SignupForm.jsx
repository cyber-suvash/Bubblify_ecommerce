import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import logo from "../assets/photos/logo.png";
import google from "../assets/photos/google.png";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useState } from "react";

const SignupForm = () => {
  const [formdata, setFormdata] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleFormdata = (event) => {
    const { name, value } = event.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value, // Updating state properly
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with:", formdata);
    setFormdata({fullname: "",
      email: "",
      phone: "",
      password: "",})
  };

  return (
    <>
      <div className="outer">
        <div className="row">
          <div className="col-md-6 col-lg-4 main text-center">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="cancel">
              <Link to={"/"}>
                <DisabledByDefaultIcon fontSize="large"/>
              </Link>
            </div>
            <h3 className="mb-0">Sign Up</h3>
            <form className="signup-form" onSubmit={handleSubmit}>
              <TextField
                label="Enter full name"
                variant="standard"
                name="fullname"
                value={formdata.fullname}
                onChange={handleFormdata}
                fullWidth
              />

              <TextField
                label="Email"
                variant="standard"
                name="email"
                value={formdata.email}
                onChange={handleFormdata}
                fullWidth
              />

              <TextField
                label="Phone number"
                variant="standard"
                name="phone"
                type="number"
                value={formdata.phone}
                onChange={handleFormdata}
                fullWidth
              />

              <TextField
                label="Password"
                variant="standard"
                type="password"
                name="password"
                value={formdata.password}
                onChange={handleFormdata}
                fullWidth
              />

              <div className="signup-btn">
                <Button type="submit">Sign Up</Button>
                <span>or</span>
                <Button>
                  <img src={google} alt="Google" />
                  Sign up with Google
                </Button>
              </div>
            </form>

            <div className="main-last">
              <p className="mb-0">
                Already have an account?{" "}
                <Link to={"/login"}>
                  <span>Login</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
