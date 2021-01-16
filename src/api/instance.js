import axios from "axios";

const instance = axios.create({
    baseURL: "https://glacial-sands-30496.herokuapp.com/api"
});
instance.interceptors.request.use(
    config => {
        config.headers.authorization = localStorage.getItem("token");
        return config;
    },
    error => {
        return Promise.reject(error)
    }
);
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.reload();
    }
    return Promise.reject(error);
});

export default instance;