const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const recordSchema = new Schema({
        nameRecord: {
            type: String,
        },
        day: {
            type: Number,
            required: true
        },
        created_at: {},
        timeRecord: {
            type: String,
            required: true,
        },
        dateRecord: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
        },
        phone: {
            type: String,
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        month: {
            type: Number,
            required: true
        },
        years: {
            type: Number,
            required: true
        }
    },
    {timestamps: true}
);

const Record = mongoose.model('Record', recordSchema)

module.exports = Record;
