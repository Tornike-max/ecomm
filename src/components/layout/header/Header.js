import { Button, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { isUserAdmin } from "../../../app/util";
import { userContext } from "../../../context/userContext";
import Search from "./Search";

const Header = () => {
  const { userData, logout } = useContext(userContext);
  
  return (
    <>
      <Link to="/cart">cart</Link>
      <br />
      <Link to="/">home</Link>
      <br />
      <Search/>
      {isUserAdmin() && <Link to="/products/new">add new product</Link>}
      {userData ? (
        <>
          <Typography>hello. {userData?.firstName}</Typography>
          <Button onClick={logout}>log out</Button>
          <Link to={`/profile/${userData?.firstName}`} 
          state={{id: userData?._id}}>profile</Link>
        </>
      ) : (
        <>
          <Link to="/login">login</Link>
        </>
      )}
    </>
  );
};

export default Header;
