import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../app/instance";
import { chechTokenValidity, getUser } from "../app/util";

export const userContext = createContext();
export const UserContextProvider = ({ children }) => {
    const [userData,setUserData] = useState(() => {
        return !chechTokenValidity() ? getUser() : null
    })
    const navigate = useNavigate()
    const registerOrLogin = async(formValues, isLoggin) => {
        const route = `users/${isLoggin ? "login" : "register"}`
        try {
            const { data } = await instance.post(route, formValues)
            localStorage.setItem("token", data.token)
            localStorage.setItem("refresh_token", data.refreshToken)
            setUserData(data.user)
            navigate(`/profile/${data.user.firstName}/`,{
                state: {id: data.user._id},
            })
        } catch (error) {
        
        }
    }
    const logout = () => {
        setUserData(null)
        localStorage.removeItem('token')
        localStorage.removeItem("refresh_token")
    }
    
    return <userContext.Provider value={{ registerOrLogin, userData, logout }} >
        {children}
    </userContext.Provider>
}