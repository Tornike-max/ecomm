import React from 'react'
import{Button,FormControl,Stack,TextField} from "@mui/material"
import { useState,useEffect,useContext } from 'react';
import { userContext } from '../../context/userContext';
import useForm from '../../app/hooks/useForm';
import formValues from '../../app/hooks/useForm';

const generateLoginFormValues = () =>{
    return{
        email:{
            value:"",
            required:true,
            error:"",
            validateInput:(email)=>email.includes("@") ? null:"email is not valid"
        },
        password:{
            value:"",
            required:true,
            error:"",
            validateInput:(password)=>password.length > 6? null:"password should have at least 6 characters"
        },
    };
};

const LoginForm = ()=>{
    const[isButtonDisabled,setIsButtonDisabled] = useState(true);
    const{
        formValues:loginFormValues, 
        onInputChange,
        checkButtonDisable,
    } = useForm({defaultFormValues:generateLoginFormValues()});
    const {registerOrLogin} = useContext (userContext);
    useEffect(()=>{
        setIsButtonDisabled(checkButtonDisable(loginFormValues));
    },[loginFormValues]);
  console.log('loginformvalues',loginFormValues);
  const onFormSubmit=(e)=>{
    e.preventDefault();
    const email = loginFormValues.email.value;
    const password = loginFormValues.password.value;
    registerOrLogin({email, password},true)
  };
  return( <FormControl fullWidth>
    <TextField 
      variant="outlined"
      name="email"
      label="email"
      value={formValues.email.value}
      onChange={onInputChange}
      error={!!formValues.email.error}
      helperText={formValues.email.error}
      margin={"dense"}
    />
    <TextField 
      variant="outlined"
      name="password"
      label="password"
      value={formValues.password.value}
      onChange={onInputChange}
      error={!!formValues.password.error}
      helperText={formValues.password.error}
      margin={"dense"}
    />
     <Button disabled={isButtonDisabled} onClick={onFormSubmit}>login</Button>
  </FormControl>
  );
}

export default LoginForm