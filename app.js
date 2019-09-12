const createError = require('http-errors');
const express = require('express');
// async error handler
require('express-async-errors');
const cors = require('cors');

// error handler
const { errorHandler } = require('./helpers/error-handler');

// routers
const apiRouter = require('./routes/api.route');
const authRouter = require('./routes/auth.route');

const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: '*',
    exposedHeaders: ['x-auth-token']
  })
);

// setup routes
app.use('/', apiRouter);
app.use('/auth', authRouter);

// db
require('./db/mongodb');

// uncaught exceptions
// process.on('uncaughtException', err => customErrorHandler(err));

// catch 404 and forward to error handler
app.use(function appNotFoundHandler(req, res, next) {
  const message = `The requested URL '${req.url}' was not found on this server.`;
  // customErrorHandler(Error(`#NotFound ${message}`), 'warn');
  next(createError(404, message));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function appErrorHandler(err, req, res, next) {
  errorHandler(err, req, res);
});

module.exports = app;
