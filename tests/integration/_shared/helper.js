exports.randomString = (
  len,
  charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
) => {
  let randomString = '';
  for (let i = 0; i < len; i += 1) {
    const randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
};

exports.createValidDataForPost = (schema, data) => {
  data.forEach(element => {
    element.retornableFields = schema.filter(item => {
      return element.nonRetornableFields.indexOf(item.name) === -1;
    });
  });
};

exports.createValidDataForGetSelect = (schema, data) => {
  data.forEach(element => {
    const { query } = element;
    let queryArray = [];
    if (query) {
      queryArray = query.substring(query.indexOf('=') + 1, query.length).split(',');
    }

    if (queryArray.length === 0) {
      element.retornableFields = schema;
    } else {
      element.retornableFields = schema.filter(item => {
        return item.name === '_id' || queryArray.indexOf(item.name) !== -1;
      });
    }
    element.nonRetornableFields = schema.filter(item => {
      return !element.retornableFields.includes(item);
    });
  });
};

exports.createValidDataForGetPagination = (data, totalCount, defaultMaxRowLimit) => {
  data.forEach(element => {
    let dataLength = element.limit < totalCount ? element.limit : totalCount;
    if (dataLength > defaultMaxRowLimit) dataLength = defaultMaxRowLimit;
    if (element.offset > 0) {
      const diff = totalCount - element.offset;
      if (diff <= 0) dataLength = 0;
      else dataLength = diff > element.limit ? element.limit : diff;
    }
    element.dataLength = dataLength;
  });
};

exports.createValidDataForPut = (schema, data) => {
  data.forEach(element => {
    element.retornableFields = schema;
    element.nonRetornableFields = schema.filter(item => {
      return !element.retornableFields.includes(item);
    });
  });
};
