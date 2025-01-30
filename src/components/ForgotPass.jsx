import React from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ReplyIcon from '@mui/icons-material/Reply';
const ForgotPass = () => {
  return (
   
    <div className="outer">
    <div className="row ">
      <div className="col-md-6 col-lg-4  main text-center" >
        
        <h3>forgot password</h3>
        <div><span><Link to={"/login"}><ReplyIcon/> </Link></span></div>
      
        <form action="" className="login-form">
          <TextField
            id="standard-basic"
            label="Enter Email"
            variant="standard"
            type="email"
          />
         

       
          <div className="signin-btn">
            <Button>submit</Button>
         
          </div>

          
        </form>
      </div>
    </div>
  </div>
   
  );
};

export default ForgotPass;
