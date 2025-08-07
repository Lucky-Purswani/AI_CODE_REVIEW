const express = require('express');
const responseRouter = require('./routes/response.route');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'https://bugsmasherai.vercel.app', // allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // include OPTIONS for preflight
  allowedHeaders: ['Content-Type', 'Authorization'], // headers your frontend might send
  credentials: true // optional, only if you're using cookies/auth
}));


app.use(express.json());

app.use('/api', responseRouter);



module.exports = app;