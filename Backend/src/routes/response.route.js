const express = require('express');
const responseRouter = express.Router();
const responseController = require('../controller/response.controller');

responseRouter.post('/get-response', responseController.getResponse);


module.exports = responseRouter;