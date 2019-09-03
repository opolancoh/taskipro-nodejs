const validation = {};

validation.objectIdRegExp = /^[0-9a-fA-F]{24}$/;
validation.integerGreaterThanZeroRegExp = /^[1-9]\d*$/;
validation.integerGreaterOrEqualThanZeroRegExp = /^\d+$/; // \d equivalent to [0-9]
validation.urlRegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
validation.alphanumericSpecialRegExp = /^(?=.*[a-zA-Z0-9 _-])/; // Allows alphanumeric, space, hyphen, underscore, at least one character
validation.emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
validation.fieldNameRegExp = /^[a-zA-Z0-9_]*$/; // Allows alphanumeric, underscore, at least one character

validation.isObjectId = value => {
  if (typeof value === 'undefined') return false;
  return validation.objectIdRegExp.test(value);
};

validation.isIntegerGreaterThanZero = value => {
  if (typeof value === 'undefined') return false;
  return validation.integerGreaterThanZeroRegExp.test(value);
};

validation.isIntegerGreaterOrEqualThanZero = value => {
  if (typeof value === 'undefined') return false;
  return validation.integerGreaterOrEqualThanZeroRegExp.test(value);
};

validation.isUrl = value => {
  if (typeof value === 'undefined') return false;
  return validation.urlRegExp.test(value);
};

validation.isAlphanumericSpecial = value => {
  if (typeof value === 'undefined') return false;
  return validation.alphanumericSpecialRegExp.test(value);
};

validation.isEmail = value => {
  if (typeof value === 'undefined') return false;
  return validation.emailRegExp.test(value);
};

module.exports = validation;
