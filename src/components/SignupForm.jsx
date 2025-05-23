import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import logo from "../assets/photos/logo.png";
import google from "../assets/photos/google.png";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const SignupForm = () => {


  const [formdata, setFormdata] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    isAdmin:false
  });


  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleFormdata = (event) => {
    const { name, value } = event.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formValidation = {};

    if (!formdata.fullname.trim()) {
      formValidation.fullname = "Full name is required";
    }

    if (!formdata.email.trim()) {
      formValidation.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
      formValidation.email = "Invalid email format";
    }

    if (!formdata.phone.trim()) {
      formValidation.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formdata.phone)) {
      formValidation.phone = "Enter a valid 10-digit phone number";
    }

    if (!formdata.password.trim()) {
      formValidation.password = "Password is required";
    } else if (formdata.password.length < 6) {
      formValidation.password = "Password must be at least 6 characters";
    }

    setErrors(formValidation);

    if (Object.keys(formValidation).length === 0) {
      const toastID = toast.loading("Signing up...");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/user/register`,
          formdata
        );
        toast.success("Signup Successful", { id: toastID });
        setFormdata({
          fullname: "",
          email: "",
          phone: "",
          password: "",
          isAdmin:''
        });
        navigate("/login");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error("Email already exists", { id: toastID });
        } else {
          toast.error("Something went wrong!", { id: toastID });
        }
      }
    } else {
      toast.error("Please enter correct details");
    }
  };

  return (
    <>
      <Toaster />
      <div className="outer">
        <div className="row">
          <div className="col-md-6 col-lg-4 main text-center">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="cancel">
              <Link to={"/"}>
                <DisabledByDefaultIcon fontSize="large" />
              </Link>
            </div>
            <h3 className="mb-0">Sign Up</h3>

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="isAdmin"
                    id="inlineRadio1"
                    value='false'
                    onChange={()=>setFormdata((prev)=>({...prev,isAdmin:false}))}
                    checked={formdata.isAdmin===false}
                  />
                  <label class="form-check-label" for="inlineRadio1">
                    User
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="isAdmin"
                    id="inlineRadio2"
                    value={formdata.isAdmin}
                    onChange={()=>setFormdata((prev)=>({...prev,isAdmin:true}))}
                    checked={formdata.isAdmin===true}
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    Admin
                  </label>
                </div>
              </div>
              {String(formdata.isAdmin)}

              <TextField
                error={Boolean(errors.fullname)}
                label="Enter full name"
                variant="standard"
                name="fullname"
                value={formdata.fullname}
                onChange={handleFormdata}
                fullWidth
                helperText={errors.fullname}
              />

              <TextField
                error={Boolean(errors.email)}
                label="Email"
                variant="standard"
                name="email"
                value={formdata.email}
                onChange={handleFormdata}
                fullWidth
                helperText={errors.email}
              />

              <TextField
                error={Boolean(errors.phone)}
                label="Phone number"
                variant="standard"
                name="phone"
                type="tel"
                value={formdata.phone}
                onChange={handleFormdata}
                fullWidth
                helperText={errors.phone}
              />

              <TextField
                error={Boolean(errors.password)}
                label="Password"
                variant="standard"
                type="password"
                name="password"
                value={formdata.password}
                onChange={handleFormdata}
                fullWidth
                helperText={errors.password}
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
