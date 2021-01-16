import instance from "../instance";

export default {
    getUsers: () => instance.get('/users'),
    uploadPhoto: (photo) => instance.post(`/upload/photo`, {photo})
}
