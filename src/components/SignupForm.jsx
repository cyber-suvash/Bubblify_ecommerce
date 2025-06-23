import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import logo from "/photos/logo.png";
import google from "/photos/google.png";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [formdata, setFormdata] = useState({
    secret: "",
    fullname: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleFormdata = (event) => {
    
    const { name, value } = event.target;
    // if(name==="role"){
    //   setFormdata({
    //     role:value,
    //     secret:"",
    //     fullname:"",
    //     email:"",
    //     phone:"",
    //     password:""
    //   })
    // }
    setErrors({})
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formValidation = {};
   
    if(formdata.role==="admin"){
     if(!formdata.secret.trim()){
      formValidation.secret="enter secret key"
    }
    else if(formdata.secret!=import.meta.env.VITE_SECRET){
      formValidation.secret='Invalid Secret key'
    }
    }

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
          secret: "",
          fullname: "",
          email: "",
          phone: "",
          password: "",
          role: "user",
        });
        navigate("/login");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error("Email already exists", { id: toastID });
        } else {
          toast.error("Something went wrong!", { id: toastID });
        }
      }
    } 
  };

  return (
    <>
      <div className="outer min-vh-100">
        <div className="row">
          <div className="col-md-6 col-lg-4 main text-center main-outer">
            <div className="cancel">
              <Link to={"/"}>
                <DisabledByDefaultIcon fontSize="large" />
              </Link>
            </div>
            <h3 className="mb-0">Sign Up</h3>

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className=" ">
                <div className="form-check form-check-inline  rounded">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="inlineRadio1"
                    value="user"
                    onChange={handleFormdata}
                    checked={formdata.role === "user"}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    <strong>User</strong>
                  </label>
                </div>
                <span>or </span>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="inlineRadio2"
                    value="admin"
                    onChange={handleFormdata}
                    checked={formdata.role === "admin"}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    <strong>Admin</strong>
                  </label>
                </div>
              </div>
              {formdata.role === "admin" ? (
                <TextField
                  error={Boolean(errors.secret)}
                  label="Enter secret code"
                  variant="standard"
                  name="secret"
                  value={formdata.secret}
                  onChange={handleFormdata}
                  fullWidth
                  helperText={errors.secret}
                />
              ) : (
                ""
              )}
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
                <Button type="submit">register</Button>
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
