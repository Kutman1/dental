import instance from "../instance";


export default {
    createNews: (value) => instance.post('/add/news', {value}),
    getNews: () => instance.get('/get/news'),
}
