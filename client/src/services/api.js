import axios from "axios";

const api = axios.create({
    baseURL: "https://spendwise-backend-thmu.onrender.com/api"
});
api.interceptors.request.use((config) => {

    const token =
        localStorage.getItem("token");

    if (token) {

        config.headers.Authorization =
            token;

    }

    return config;

});

export default api;