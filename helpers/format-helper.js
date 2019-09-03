const format = {};

format.csvToArray = (value, separator) => {
  const ret = [];
  if (value) {
    value.split(separator || ',').forEach(element => {
      const item = element.trim();
      if (item !== '') ret.push(item);
    });
  }
  return ret;
};

module.exports = format;
