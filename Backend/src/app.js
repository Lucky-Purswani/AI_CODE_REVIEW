const express = require('express');
const responseRouter = require('./routes/response.route');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/api', responseRouter);



module.exports = app;