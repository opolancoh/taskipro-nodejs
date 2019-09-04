const express = require('express');
const cors = require('cors');

// error handler
const { systemErrorHandler, customErrorHandler } = require('./helpers/error-handler');
const notFoundHandler = require('./helpers/not-found-handler');
// require('express-async-errors');

// routers
const homeRouter = require('./routes/home.route');
const apiRouter = require('./routes/api.route');
const authRouter = require('./routes/auth.route');

const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: '*'
  })
);

// setup routes
app.use('/', homeRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// db
require('./db/mongodb');

// uncaught exceptions
process.on('uncaughtException', err => customErrorHandler(err));

// error handler
app.use(systemErrorHandler);

// catch 404 and forward to error handler
app.use(notFoundHandler);

module.exports = app;
