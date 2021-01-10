const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: "user"
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        default: '',
    },
    news: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "News"
    },
    newsReaded: {
      count: Number,
      default: 0
    },
    newsReadedHistory : {
        count: Number,
        default: 0
    },
    photo: {
        type: String,
        default: ""
    }
});

const User = mongoose.model('User', userSchema)

module.exports = User;
