import { useState, createContext } from "react";
import { instance } from "../app/instance";
import { useNavigate } from "react-router-dom";
import { checkTokenValidty, getUser } from "../app/util";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(()=>{
    return !checkTokenValidty() ? getUser() : null;
  });
  const navigate = useNavigate();
  const registerOrLogin = async (formValues, isLogin) => {
    const route = `users/ ${isLogin ? "login" : "register"}`;
    try {
      const { data } = await instance.post(route, formValues);
      localStorage.setItem("token", data.token);
      localStorage.setItem("refresh_token", data.refreshToken);
      setUserData(data.user);
      console.log("here");
      navigate(`/profile/${data.user.firstName}/`,{
        state: {id: data.user._id}
      });
      console.log("after");
    } catch (error) {
      setUserData(error);
    }
  };

  const logout = ()=>{
    setUserData(null);
    localStorage.removeItem("token")
    localStorage.removeItem("refresh_token")
  }

  return (
    <userContext.Provider value={{ registerOrLogin, userData, logout }}>
      {children}
    </userContext.Provider>
  );
};
