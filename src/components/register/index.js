import React from 'react';
import{Link} from 'react-router-dom';
import RegisterForm from './RegisterForm';

const Register = () => {
  return (
    <div>
        <RegisterForm></RegisterForm>
        <Link to="/login">already have account</Link>
    </div>
  )
}

export default Register;