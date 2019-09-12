const jwt = require('jsonwebtoken');
const config = require('config');

const { rc400, rc401 } = require('../helpers/base-response');

function authorize(roles) {
  // eslint-disable-next-line no-return-assign
  return (
    authorize[roles] ||
    (authorize[roles] = function authorizeMiddleware(req, res, next) {
      const token = req.headers['x-auth-token'];
      if (!token)
        return res.status(200).send({ ...rc401, message: 'Access denied. No token provided.' });

      let decoded = null;
      try {
        // if token is valid, add user to the request
        decoded = jwt.verify(token, config.get('secrets.jwtPrivateKey'));
      } catch (ex) {
        return res.status(200).send({ ...rc400, message: 'Invalid token.' });
      }

      if (Array.isArray(roles) && roles.length > 0) {
        let hasPermission = false;
        for (let i = 0; i < roles.length; i += 1) {
          if (decoded.roles.indexOf(roles[i]) !== -1) {
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
      return next();
    })
  );
}

module.exports = authorize;
