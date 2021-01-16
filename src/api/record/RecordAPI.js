import instance from "../instance";

export default {
    createRecord: (body) => instance.post('/add/record', body),
    getRecords: () => instance.get('/records'),
    getMyRecords: () => instance.get('/my/records'),
    removeRecord: (id) => instance.delete("/records/delete", id),
    addSlots: (body) => instance.post('/add/slot', {slots: body}),
    getInfoSlots: (date) => instance.post('/get/slot', {slots: date})
}

