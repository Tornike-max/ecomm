import axios from "axios";
import { checkTokenValidty } from "./util";


export const instance = axios.create({
    baseUrl: 'http://localhost:3000',
});


instance.interceptors.request.use(async(req)=>{
    const token = localStorage.getItem("token")
    const refresh_token = localStorage.getItem("refresh_token")

    if(!token) return req;
    req.headers.Authorization = `Bearer ${token}`
    const isExpired = checkTokenValidty()
    if(isExpired) return req;
    const {data} = await axios.post("http://localhost:3000/users/refresh",{
    refresh_token,
});
localStorage.setItem("token", data.token);
req.headers.Authorization = `Bearer ${token}`;
return req;
})