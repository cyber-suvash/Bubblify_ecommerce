
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import logo from "../assets/photos/logo.png";
import google from "../assets/photos/google.png";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
const LoginForm = () => {
  return (
    <>
     
      <div className="outer">
        <div className="row ">
          <div className="col-md-6 col-lg-4  main text-center" >
            <div className="logo">
              <img src={logo} alt="" />
            </div>

            <div className="cancel">
              <Link to={"/"}>
                <DisabledByDefaultIcon className="" />
              </Link>
            </div>
            <h3>sign in</h3>
          
            <form action="" className="login-form">
              <TextField
                id="standard-basic"
                label="Enter Email"
                variant="standard"
              />
              <TextField
                id="standard-basic"
                label="password"
                variant="standard"
                type="password"
              />

             <Link to={'/forgotpassword'}><span>forgot password?</span></Link> 
              <div className="signin-btn">
                <Button>sign in</Button>
                <span>or</span>
                <Button>
                  <img src={google} alt="" />
                  sign in with google
                </Button>
              </div>

              <div className="main-last">
                <p>
                  not have an account?{" "}
                  <Link to={"/signUp"}>
                    <span>signup</span>
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
