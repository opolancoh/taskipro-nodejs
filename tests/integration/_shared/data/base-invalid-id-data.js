exports.getData = action => {
  const invalidData = [
    {
      id: '123456',
      code: 400,
      message: () => {
        return `should not ${action} a record when ID '${this.id}' is not valid`;
      }
    },
    {
      id: '5c6e36b17a76dd1f30c17be1',
      code: 404,
      message: () => {
        return `should not ${action} a record when ID '${this.id}' is valid but not exists on DB`;
      }
    }
  ];
  return invalidData;
};
