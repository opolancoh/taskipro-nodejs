exports.getData = action => {
  const invalidData = [
    {
      body: {
        prop: 'prop'
      },
      code: 400,
      message() {
        return `should not ${action} an item when field/property is not allowed`;
      }
    },
    {
      body: {},
      code: 400,
      message() {
        return `should not ${action} an empty item/object`;
      }
    }
  ];
  return invalidData;
};
