const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const translateRoute = require('./routes/translate');
const { errorMonitor } = require('events');

app.use(morgan('dev'));
app.use(cors());
app.use('/',translateRoute);


//ask this
app.use((req,res,next) => {
    const error = new Error('Go to <url>/translate?sourceText=&targetLanguage=');
    error.status = 400;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
        }
    })
});
module.exports = app;