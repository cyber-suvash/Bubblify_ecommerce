import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ isLoggedIn, roles = [], user, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (!roles.includes(user?.role)) {
    return <Navigate to={"/unauthorized"} />;
  }
  return children;
};

export default ProtectedRoutes;
