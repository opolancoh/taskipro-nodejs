/* exports.parseObjectId = function(id) {
  return mongoose.Types.ObjectId(id);
}; */

exports.auditSchema = {
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
};
