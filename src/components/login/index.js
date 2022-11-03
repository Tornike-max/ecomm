import React from 'react'

import{Link} from "react-router-dom";
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <div>
        <LoginForm></LoginForm>
        <Link to="/register">don't have an account</Link>
    </div>
  )
}

export default Login