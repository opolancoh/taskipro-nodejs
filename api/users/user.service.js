const bcrypt = require('bcrypt');

const {
  baseFind,
  baseFindById,
  baseUpdate,
  baseRemove,
  setAuditInformation
} = require('../_shared/base-service');
const { code_400, code_409, code_201 } = require('../../helpers/base-response');
//const { isObjectId } = require('../../helpers/validation-helper');
const { User } = require('./user.model');

/**
 * Creates a new record.
 */
const create = async function(data) {
  // input validation
  const { errors } = User.validate(data, true);
  if (errors)
    return {
      ...code_400,
      errors
    };

  // check if user already exists
  const userExists = await User.findOne({ email: data.email });
  if (userExists)
    return {
      ...code_409,
      errors: {
        email: [`"${data.email}" already exists.`]
      }
    };

  // set default displayName
  if (!data.displayName) Object.assign(data, { displayName: data.name });

  // audit information
  setAuditInformation(data);

  // create new record
  let newResource = new User(data);
  newResource.password = await bcrypt.hash(data.password, 10);
  await newResource.save();

  return { ...code_201, message: 'User created.', d: newResource };
};

/**
 * Returns a list of records based on multiple parameters.
 */
const find = async function(params) {
  return await baseFind(User, params);
};

/**
 * Returns a record based on id and multiple parameters.
 */
const findById = async function(id, params) {
  return await baseFindById(User, id, params);
};

/**
 * Updates a record based on its id and any field.
 */
const update = async (id, data) => {
  if (data.password)
    return {
      ...code_400,
      errors: {
        password: [`This field is not allowed to be updated by this method.`]
      }
    };
  return await baseUpdate(User, id, data);
};

/**
 * Deletes a record based on its id.
 */
const remove = async id => {
  return await baseRemove(User, id);
};

module.exports = {
  create,
  find,
  findById,
  update,
  remove
};
