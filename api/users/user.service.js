const bcrypt = require('bcrypt');

const {
  baseFind,
  baseFindById,
  baseUpdate,
  baseRemove,
  setAuditInformation
} = require('../_shared/base-service');
const { rc400, rc409, rc201 } = require('../../helpers/base-response');

const { User } = require('./user.model');

/**
 * Creates a new record.
 */
const create = async data => {
  // input validation
  const { errors } = User.validate(data, true);
  if (errors)
    return {
      ...rc400,
      errors
    };

  // check if user already exists
  const userExists = await User.findOne({ email: data.email });
  if (userExists)
    return {
      ...rc409,
      errors: {
        email: [`"${data.email}" already exists.`]
      }
    };

  // set default displayName
  if (!data.displayName) Object.assign(data, { displayName: data.name });

  // audit information
  setAuditInformation(data);

  // create new record
  const newResource = new User(data);
  newResource.password = await bcrypt.hash(data.password, 10);
  await newResource.save();

  return { ...rc201, message: 'User created.', d: newResource };
};

/**
 * Returns a list of records based on multiple parameters.
 */
const find = async params => {
  return baseFind(User, params);
};

/**
 * Returns a record based on id and multiple parameters.
 */
const findById = async (id, params) => {
  return baseFindById(User, id, params);
};

/**
 * Updates a record based on its id and any field.
 */
const update = async (id, data) => {
  if (data.password)
    return {
      ...rc400,
      errors: {
        password: [`This field is not allowed to be updated by this method.`]
      }
    };
  return baseUpdate(User, id, data);
};

/**
 * Deletes a record based on its id.
 */
const remove = async id => {
  return baseRemove(User, id);
};

module.exports = {
  create,
  find,
  findById,
  update,
  remove
};
