import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({isLoggedIn,children}) => {
  return isLoggedIn ===true ? children : <Navigate to='/login'/>
}

export default ProtectedRoutes