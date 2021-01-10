const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const slotSchema = new Schema({
    slots: {
        type: Object,
        required: true,
        date: null,
        disabled: []
    },
});

const Slot = mongoose.model('Slot', slotSchema)

module.exports = Slot;
