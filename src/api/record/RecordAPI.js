import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {'Access-Control-Allow-Origin': "*"},
    mode: 'cors',
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
    createRecord: (body) => instance.post('/add/record', body),
    getRecords: () => instance.get('/records'),
    getMyRecords: () => instance.get('/my/records'),
    removeRecord: (id) => instance.delete("/records/delete", id),
    addSlots: (body) => instance.post('/add/slot', {slots: body}),
    getInfoSlots: (date) => instance.post('/get/slot', {slots: date})
}

