import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import logo from "../assets/photos/logo.png";
import google from "../assets/photos/google.png";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
const SignupForm = () => {
  return (
    <>
      <div className="outer">
        <div className="row">
          <div className="col-md-6 col-lg-4 main text-center">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div className="cancel">
              <Link to={"/"}>
                <DisabledByDefaultIcon className="" />
              </Link>
            </div>
            <h3 className="mb-0">sign up</h3>
            <form action="" className="signup-form">
              <TextField
                id="standard-basic"
                label="Enter full name"
                variant="standard"
              />

              <TextField id="standard-basic" label="Email" variant="standard" />
              <TextField
                id="standard-basic"
                label="Phone no"
                variant="standard"
              />
              <TextField
                id="standard-basic"
                label="Password"
                variant="standard"
                type="password"
                className="password"
              />
              <div className="signup-btn">
                <Button>sign up</Button>
                <span>or</span>
                <Button>
                  {" "}
                  <img src={google} alt="" />
                  signup with google
                </Button>
              </div>

              <div className="main-last">
                <p className="mb-0">
                  not have an account?{" "}
                  <Link to={"/login"}>
                    <span>login</span>
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

export default SignupForm;
