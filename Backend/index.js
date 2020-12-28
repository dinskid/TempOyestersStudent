const express = require('express');
const mysql = require('mysql');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
require('dotenv').config();

require('./config/connection');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use(morgan('dev'));
app.use(fileUpload());
app.use(morgan('dev'));

//Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/auth', require('./loginSignUp'));
app.use('/sessions', require('./sessions'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
