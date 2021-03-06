const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const { User } = require('../core/users/user.model');
const { rc400 } = require('../helpers/base-response');

/* service.signup = async item => {
  return await userService.create(item);
}; */

const login = async credentials => {
  if (!credentials.email || !credentials.password)
    return { ...rc400, message: 'Invalid email or password.' };

  // Find a user with by email
  const user = await User.findOne({ email: credentials.email });
  if (!user) return { ...rc400, message: 'Invalid email or password.' };

  const validPassword = await bcrypt.compare(credentials.password, user.password);
  if (!validPassword) return { code: 400, message: 'Invalid email or password.' };

  const token = jwt.sign(
    {
      id: user._id,
      displayName: user.displayName,
      email: user.email,
      roles: user.roles
    },
    config.get('secrets.jwtPrivateKey'),
    {
      expiresIn: config.get('app.security.tokenExpiresIn')
    }
  );
  return { code: 200, d: { token } };
};

module.exports = { login };
