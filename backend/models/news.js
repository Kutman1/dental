const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const newsSchema = new Schema({
        value: {
            type: String,
            default: ""
        },
    },
    {timestamps: true}
);

const News = mongoose.model('News', newsSchema)

module.exports = News;
