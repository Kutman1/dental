import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:5000/api"
});


export default {
    createUser: (user) => instance.post('/create/user', user),
    loginUser: (user) => instance.post("/login/user", user)
}
