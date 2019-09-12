const Joi = require('joi');

exports.validateSchema = (value, schema, onCreate) => {
  let errors;

  const result = Joi.validate(value, schema, {
    abortEarly: false,
    context: { onCreate }
  });

  if (result.error) {
    errors = {};
    result.error.details.forEach(element => {
      if (!Object.prototype.hasOwnProperty.call(errors, element.context.key))
        errors[element.context.key] = [];
      errors[element.context.key].push(element.message);
    });
  }
  // return { validatedItem: result.value, errors };
  return { errors };
};
