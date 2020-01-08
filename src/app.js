const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes')();
//const cors = require('cors');
//const constants = require('./../constants');

const app = express();
/*
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'credentials': true,
  'origin': ['http://localhost:3000', 'http://192.168.1.38:3000']
}));
*/
app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load api routes
app.use('/', routes);

//Handling errors
app.use(async (error, req, res, next) => {
  console.error(`${req.method} ${req.url} ${error.message} ${error.stack}`);
  try {
    return res.status(500).send({ errors: [{ message: error.message }] });
  } catch (error) {
    return next(error);
  }

});

module.exports = app;
