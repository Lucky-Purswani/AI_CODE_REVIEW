const express = require('express');
const responseRouter = require('./routes/response.route');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'https://bugsmasherai.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // adjust based on what you use
  credentials: true // optional: allow cookies/auth headers
}));

app.use(express.json());

app.use('/api', responseRouter);



module.exports = app;