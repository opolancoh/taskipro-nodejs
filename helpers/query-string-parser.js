const config = require('config');

const {
  isIntegerGreaterThanZero,
  fieldNameRegExp
} = require('../helpers/validation-helper');
const { csvToArray } = require('../helpers/format-helper');

const parseLimit = value => {
  // set limit
  // limit=5
  let limit = config.get('app.items.limit');
  if (value && isIntegerGreaterThanZero(value)) {
    const limitParsed = value * 1;
    if (limitParsed <= 0) limit = config.get('app.items.limit');
    else
      limit =
        limitParsed > config.get('app.items.limitMax')
          ? config.get('app.items.limitMax')
          : limitParsed;
  }
  return limit;
};

const parseOffset = value => {
  // set offset
  // offset=10
  let offset = 0;
  if (value && isIntegerGreaterThanZero(value)) {
    offset = value * 1;
  }
  return offset;
};

const parseSort = value => {
  // set sort
  // sort=name,-updatedAt
  // { name: 1, updatedAt: -1 }
  let sort = {};
  if (value) {
    value = csvToArray(value);
    value.forEach(element => {
      let propName = element;
      let isAsc = true;

      const sortOrder = element.substring(0, 1);
      if (sortOrder === '-' || sortOrder === '+') {
        propName = element.substring(1, propName.length + 1);
        if (sortOrder === '-') isAsc = false;
      }

      sort[propName] = isAsc ? 1 : -1;
    });
  }
  return sort;
};

const parseSelect = value => {
  // set select
  // select=name,updatedAt
  let select = [];
  if (value) {
    value = csvToArray(value);
    value.forEach(element => {
      const item = element.trim();
      if (fieldNameRegExp.test(item)) select.push(item);
    });
  }
  return select;
};

const parseFilter = value => {
  // set filter
  // search=name:in|description:descr
  // { name: /in/i, description: /descr/i }
  let filter = {};
  if (value) {
    value = csvToArray(value, '|');
    value.forEach(element => {
      const index = element.indexOf(':');
      if (index !== -1) {
        const propName = element.substring(0, index);
        const searchText = element.substring(index + 1, element.length);
        if (propName && searchText)
          filter[propName] = new RegExp(searchText, 'i');
      }
    });
  }
  return filter;
};

const parsePopulate = value => {
  // set populate
  // populate=category:name,updatedAt|account:name
  // [{ path: 'category', select: 'name createdAt' },{ path: 'account', select: 'name' }]
  let populate = [];
  if (value) {
    value = csvToArray(value, '|');
    value.forEach(element => {
      const colonIndex = element.indexOf(':');
      if (colonIndex !== -1) {
        const propName = element.substring(0, colonIndex);
        const listFields = csvToArray(
          element.substring(colonIndex + 1, element.length)
        );
        if (propName && listFields.length > 0) {
          const fields = [];
          listFields.forEach(item => {
            fields.push(item);
          });
          if (fields.length > 0)
            populate.push({ path: propName, select: fields.join(' ') });
        }
      }
    });
  }
  return populate;
};

module.exports = {
  parseLimit,
  parseOffset,
  parseSort,
  parseSelect,
  parseFilter,
  parsePopulate
};
