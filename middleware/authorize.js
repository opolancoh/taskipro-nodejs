const jwt = require('jsonwebtoken');
const config = require('config');

const { c400 } = require('../helpers/base-response');

function authorize(roles) {
  return (
    authorize[roles] ||
    (authorize[roles] = function(req, res, next) {
      const token = req.headers['x-auth-token'];
      if (!token)
        return res
          .status(200)
          .send({ code: 401, message: 'Access denied. No token provided.' });

      let decoded = null;
      try {
        // if token is valid, add user to the request
        decoded = jwt.verify(token, config.get('secrets.jwtPrivateKey'));
      } catch (ex) {
        res.status(200).send({ ...c400, message: 'Invalid token.' });
      }

      if (Array.isArray(roles) && roles.length > 0) {
        let hasPermission = false;
        for (let rol of roles) {
          if (decoded.roles.indexOf(rol) !== -1) {
            hasPermission = true;
            break;
          }
        }

        if (!hasPermission)
          return res.status(200).send({
            code: 403,
            message: 'User has insufficient permissions.'
          });
      }

      req.user = decoded;
      next();
    })
  );
}

module.exports = authorize;
