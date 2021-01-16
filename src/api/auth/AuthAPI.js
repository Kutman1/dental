import instance from "../instance";


export default {
    createUser: (user) => instance.post('/create/user', user),
    loginUser: (user) => instance.post("/login/user", user)
}
