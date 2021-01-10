const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const api = require('./routes/api');




const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cors());

app.use('/api', api);



async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        app.listen(PORT, () => console.log(`server is running  -> ${PORT}`))
    } catch (e) {
        console.log(e);
        process.exit(1)
    }
}

start();

