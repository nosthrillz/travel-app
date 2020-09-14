const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cores = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app = express()

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Error: Not connected to Database!", err);
});

app.use(morgan('common'));
app.use(helmet());
app.use(cores({
    origin: process.env.CORS_ORIGIN
}));
app.use(express.json());

app.get('/', (req,res) => {
    res.json({
        message: "We live but empty bro"
    })
});

app.use('/api/logs', logs); // looks at the Router from logs.js

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});