const express = require('express');

const router = express.Router();

const userController = require('../core/users/user.controller');

/* Core */
router.use('/users', userController);

/* Home Page */
router.get('/', (req, res) => {
  let message = '<h1>Authentication & Authorization App with NodeJS and JWT</h1>\n';
  message += '<h2>Request received</h2>\n';
  message += '<h3>Headers</h3>\n';
  message += JSON.stringify(req.headers);
  message += '<h3>Body</h3>\n';
  message += JSON.stringify(req.body);
  message += '<h3>Query</h3>\n';
  message += JSON.stringify(req.query1.yes);
  res.send(message);
});

module.exports = router;
