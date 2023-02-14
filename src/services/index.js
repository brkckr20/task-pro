import axios from "axios";

const SERVER_URL = process.env.REACT_APP_BASE_ENDPOINT;

export const getSectors = async () => {
    const { data } = await axios.get(`${SERVER_URL}/api/sector`);
    return data;
}

export const getSector = async () => {
    const { data } = await axios.get(`${SERVER_URL}/api/sector`);
    return data;
}


export const newUser = async (user) => {
    const { data } = await axios.post(`${SERVER_URL}/api/user`, user);
    return data;
}

export const getUser = async () => {
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.get(`${SERVER_URL}/api/user`, { headers: { "Authorization": token.token } });
    return data;
}

export const handleLogin = async (input) => {
    const { data } = await axios.post(`${SERVER_URL}/api/user/login`, input);
    return data;
}

export const fetchMe = async (username) => {
    const { data } = await axios.get(`${SERVER_URL}/api/user/me/${username}`);
    return data;
}

export const updateUser = async (id, inputValue) => {
    const { data } = await axios.put(`${SERVER_URL}/api/user/${id}`, inputValue);
    return data;
}