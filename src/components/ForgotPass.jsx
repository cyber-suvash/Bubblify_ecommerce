import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import axios from "axios";
const ForgotPass = () => {
const [forgot,setForgot]=useState('');

const handleSubmit=(e)=>{
  e.preventDefault();
  if(forgot.trim()===''){
    return toast.error('enter your email')
  }
  console.log(forgot)


}
  return (
    <div className="outer min-vh-100">
      <div className="row ">
        <div className="col-md-6 col-lg-4  main text-cente">
          <h3>forgot password</h3>
          <form action="" className="login-form" onSubmit={handleSubmit}>
            <TextField
              id="standard-basic"
              label="Enter Email"
              variant="standard"
              type="email"
              name="forgot"
              value={forgot}
              onChange={(e)=>setForgot(e.target.value)}
            />
            <div className="signin-btn">
              <Button type="submit">submit</Button>
            </div>
          </form>
          <Link to={"/login"}>
            <span>Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
