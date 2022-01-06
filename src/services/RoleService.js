import axios from "axios";

const API_URL = 'http://localhost:8080/api/'

const getRole = () => {
    return axios.get(API_URL + "role");
};
export default { getRole };