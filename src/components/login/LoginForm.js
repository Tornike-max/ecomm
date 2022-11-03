import { FormControl, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../context/userContext'
import useForm from '../../app/hooks/useForm'

const generateLoginFormValues =() => {
    return {
        email: {
            value: "",
            required: true,
            error:"",
            validateInput: (email) =>
            email.includes("gmail.com") ? null : "Your Email is not valid bro"
        },
        
            password: {
                value: "",
                required: true,
                error:"",
                validateInput: (password) =>
                password.length > 5 ? null : "Enter at least 5 characters my bro"
            }
            
        
    }
    
}

const LoginForm = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const {
        formValues: loginFormValues,
        onInputChange,
        checkButtonDisable
    } = useForm({ defaultFormValues : generateLoginFormValues(), })
    const { registerOrLogin } = useContext(userContext)
    useEffect(() => {
        setIsButtonDisabled(checkButtonDisable(loginFormValues))
    }, [loginFormValues])
    const onFormSubmit =(e)=> {
        e.preventDefault();
        const email = loginFormValues.email.value
        const password = loginFormValues.password.value
        registerOrLogin({ email, password }, true )
    }
  return (
    <FormControl>
        <TextField 
        variant='outlined'
        name='email'
        label='email'
        value={loginFormValues.email.value}
        onChange={onInputChange}
        error={!!loginFormValues.email.error}
        helperText={loginFormValues.email.error}
    />
    <TextField 
        variant='outlined'
        name='password'
        label='password'
        value={loginFormValues.password.value}
        onChange={onInputChange}
        error={!!loginFormValues.password.error}
        helperText={loginFormValues.password.error}
    />
    <button disabled={isButtonDisabled} onClick={onFormSubmit}>Login</button>
    </FormControl>
  )
}

export default LoginForm