import { Button, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { isUserAdmin } from "../../../app/util";
import { userContext } from "../../../context/userContext";

const Header = () => {
  const { userData, logout } = useContext(userContext);
  return (
    <>
      <Link to="/cart">Cart</Link>
      <br />
      <Link to="/">Home</Link>
      <br />
      <TextField />
      {isUserAdmin() && <Link to="/products/new">Add New Product</Link>}
      {userData ? (
        <>
          <Typography>Hello, {userData?.firstName}</Typography>
          <Button onClick={logout}>Log out</Button>
          <Link
            to={`/profile/${userData?.firstName}`}
            state={{ id: userData?._id }}
          >
            Profile
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
        </>
      )}
    </>
  );
};

export default Header;
