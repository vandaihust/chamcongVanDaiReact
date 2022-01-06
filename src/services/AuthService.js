import axios from "axios"
import { API_URL } from "../contants/apiURL"


const register = (username, password, [roleElement]) => {
    let roleStr = [];
    if (roleElement === 'ROLE_SUPPORT') roleStr.push("support");
    if (roleElement === 'ROLE_ADMIN') roleStr.push("admin");
    if (roleElement === 'ROLE_USER') roleStr.push("user");

    return axios.post(API_URL + "signup", {
        username,
        password,
        role: roleStr
    })
}

const login = (username, password) => {
    return axios.post(API_URL + 'signin', {
        username,
        password
    }).then(response => {
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data))
            console.log(response.data);
        }
        return response.data
    })
}
const logout = () => {
    localStorage.removeItem("user");
};
export default { register, login, logout }

