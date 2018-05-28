const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
    mongoose.connect('mongodb://localhost/happyHourApiTest');
} else {
    mongoose.connect('mongodb://localhost/happyHourApi');
}

const app = express();

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
    app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(express.static('uploads'))

// Routes
app.use('/users', require('./routes/user.routes'));
app.use('/business', require('./routes/business.routes'));

module.exports = app;