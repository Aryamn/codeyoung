//initilaizing packages
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const translateRoute = require('./routes/translate');
const { errorMonitor } = require('events');

//using logging to display statstics in development mode
app.use(morgan('dev'));
app.use(cors());

//route for translating require text
app.use('/',translateRoute);


//Handling error
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

//exporting app to be used by server
module.exports = app;