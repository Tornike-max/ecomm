import React from "react";
import useForm from "../../app/hooks/useForm";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { userContext } from "../../context/userContext";

const generateRegisterFormValues = () => {
  return {
    firstName: {
      value: "",
      required: true,
      error: "",
      validateInput: (name) =>
        name.length > 3 ? null : "name should have at least 3 characters",
    },
    lastName: {
      value: "",
      required: true,
      error: "",
      validateInput: (lastName) =>
        lastName.length > 3
          ? null
          : "last name should have at least 1 characters",
    },
    email: {
      value: "",
      required: true,
      error: "",
      validateInput: (email) =>
        email.includes("@") ? null : "email is not valid",
    },
    password: {
      value: "",
      required: true,
      error: "",
      validateInput: (password) =>
        password.length > 6
          ? null
          : "password should have at least 6 characters",
    },
  };
};

const RegisterForm = () => {
  const { registerOrLogin } = useContext(userContext);
  const { formValues, onInputChange, checkButtonDisable } = useForm({
    defaultFormValues: generateRegisterFormValues(),
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  useEffect(() => {
    setIsButtonDisabled(checkButtonDisable(formValues));
  }, [formValues]);

  const registerUser = (e) => {
    e.preventDefault();
    const firstName = formValues.firstName.value;
    const lastName = formValues.lastName.value;
    const email = formValues.email.value;
    const password = formValues.password.value;
    registerOrLogin({ firstName, lastName, email, password }, false);
  };
  return (
    <FormControl>
      <TextField
        variant="outlined"
        name="firstName"
        label="First Name"
        value={formValues.firstName.value}
        onChange={onInputChange}
        error={!!formValues.firstName.error}
        helperText={formValues.firstName.error}
        margin={"dense"}
      />
      <TextField
        variant="outlined"
        name="lastName"
        label="last Name"
        value={formValues.lastName.value}
        onChange={onInputChange}
        error={!!formValues.lastName.error}
        helperText={formValues.lastName.error}
        margin={"dense"}
      />
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
      <Button disabled={isButtonDisabled} onClick={registerUser}>
        Register
      </Button>
    </FormControl>
  );
};

export default RegisterForm;
