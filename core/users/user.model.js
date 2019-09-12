const Joi = require('joi');
const mongoose = require('mongoose');

const { emailRegExp } = require('../../helpers/validation-helper');
const { validateSchema } = require('../_shared/base-validator');
const { auditSchema } = require('../_shared/base-model');
const { getRoles } = require('../../auth/auth.helper');

// db schema
const modelSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  displayName: {
    type: String
  },
  roles: [String],
  ...auditSchema
});

const schema = {
  name: Joi.string()
    .min(2)
    .max(50)
    .label('Name')
    .when('$onCreate', {
      is: true,
      then: Joi.required()
    }),
  email: Joi.string()
    .max(255)
    .regex(emailRegExp)
    .label('Email')
    .when('$onCreate', {
      is: true,
      then: Joi.required()
    }),
  password: Joi.string()
    .min(8)
    .max(255)
    .label('Password')
    .when('$onCreate', {
      is: true,
      then: Joi.required()
    }),
  displayName: Joi.string()
    .min(3)
    .max(50)
    .label('Display Name'),
  roles: Joi.array()
    .min(1)
    .items(Joi.string().valid(getRoles()))
    .label('Roles')
    .when('$onCreate', {
      is: true,
      then: Joi.required()
    })
};

// validates the schema
modelSchema.statics.validate = (value, onCreate = true) => {
  return validateSchema(value, schema, onCreate);
};

const User = mongoose.model('User', modelSchema);

module.exports = { User, schema };
