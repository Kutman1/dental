import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:5000/api"
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

export default {
    createNews: (value) => instance.post('/add/news', {value}),
    getNews: () => instance.get('/get/news'),
}
