import decode from "jwt-decode";

export const getUser = ()=>{
    const token = localStorage.getItem('token');
    console.log("decode", decode(token))
    return token ? decode(token) : null;
}

export const isUserAdmin = ()=>{
    const token = getUser();
    console.log("tokeni ari", token)
    return token ? token.role.includes("admin") : null;
};

export const checkTokenValidty = (token)=>{
    const expirationDate = getUser().exp;
    const isExpired = expirationDate * 1000 < new Date().getTime();
    return isExpired;
}