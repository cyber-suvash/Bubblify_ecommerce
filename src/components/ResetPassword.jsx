import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [pass, setPass] = useState("");

  return (
    <div className="min-vh-100">
      <div className="row">
        <div className="col-md-6">
          <h3>Reset Password</h3>
          <form action="">
            <TextField
              id="email"
              label="Enter Email"
              variant="standard"
              type="email"
              name="forgot"
              value={forgot}
              onChange={(e) => setForgot(e.target.value)}
            />
            <TextField
              id="email"
              label="New passowrd"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setpass(e.target.value)}
            />
            <div className="signin-btn">
              <Button type="submit">submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
