const { rc200, rc400, rc404 } = require('../../helpers/base-response');
const { isObjectId } = require('../../helpers/validation-helper');

// helper functions
const setAuditInformation = (schema, onCreate = true) => {
  const now = new Date();
  if (onCreate) schema.createdAt = now;
  schema.updatedAt = now;
};

const baseFind = async (
  model,
  { limit, offset, sort, select, filter, populate, setTotalCount }
) => {
  // set metadata to the response
  const meta = {
    limit,
    offset
  };

  const query = model.find(filter);
  const data = await query
    .skip(offset)
    .limit(limit)
    .sort(sort)
    .select(select)
    .populate(populate)
    .exec();

  // set totalCount
  if (setTotalCount) {
    if (data.length > 0) {
      meta.totalCount = await model
        .find(filter)
        .countDocuments()
        .exec();
    } else meta.totalCount = 0;
  }

  return {
    ...rc200,
    meta,
    d: data
  };
};

const baseFindById = async (model, id, { select, populate }) => {
  // input validation
  if (!isObjectId(id))
    return {
      ...rc400,
      errors: {
        id: [`Id '${id}' is not valid.`]
      }
    };

  const query = model.findById(id);
  const data = await query
    .select(select)
    .populate(populate)
    .exec();

  if (data) {
    return {
      ...rc200,
      d: data
    };
  }
  return {
    ...rc404,
    errors: {
      id: [
        `The specified item Id '${id}' was not found, or you do not have permission to access it.`
      ]
    }
  };
};

const baseUpdate = async (Model, id, data) => {
  // input validation
  // validate id
  if (!isObjectId(id))
    return {
      ...rc400,
      errors: {
        id: [`Id '${id}' is not valid.`]
      }
    };
  // validate if data is empty
  const isEmpty = Object.keys(data).length === 0;
  if (isEmpty)
    return {
      ...rc400,
      errors: {
        $_: [`You must provide at least one field to be updated.`]
      }
    };
  // validate data
  const { errors } = Model.validate(data, false);
  if (errors)
    return {
      ...rc400,
      errors
    };

  // audit information
  setAuditInformation(data, false);

  // update a record
  const recordUpdated = await Model.findOneAndUpdate(
    {
      _id: id
    },
    data,
    {
      new: true
    }
  );

  if (!recordUpdated) {
    return {
      ...rc404,
      errors: {
        id: [
          `The specified item Id '${id}' was not found, or you do not have permission to access it.`
        ]
      }
    };
  }
  return {
    ...rc200,
    d: recordUpdated
  };
};

const baseRemove = async (Model, id, options = {}) => {
  // validate id
  if (!isObjectId(id))
    return {
      ...rc400,
      errors: {
        id: [`Id '${id}' is not valid.`]
      }
    };

  // delete a record
  const recordDeleted = await Model.findOneAndDelete(
    {
      _id: id
    },
    options
  );

  if (recordDeleted)
    return {
      ...rc200,
      d: recordDeleted
    };

  return {
    ...rc404,
    errors: {
      id: [
        `The specified item Id '${id}' was not found, or you do not have permission to access it.`
      ]
    }
  };
};

/*

baseService.create = async (body, model, callback) => {
  // Input and business validation
  const validationResult = await model._validator.createValidation(body);
  if (validationResult.errors) return validationResult;

  const item = validationResult.validatedItem;

  // Create
  const now = new Date();
  item.createdAt = now;
  item.updatedAt = now;
  let itemCreated = await model.create(item);

  // Delete fields that are not returnable
  if (model._validFields.nonReturnable)
    deleteNonReturnableFieldsFromObject(
      itemCreated,
      model._validFields.nonReturnable
    );

  return {
    code: 201,
    d: itemCreated
  };
}; */

/* const getSelectableFields = (select, nonReturnableFields) => {
  let selectableFields = select;
  if (nonReturnableFields) {
    const selectFiltered = select.filter(function(e) {
      return this.indexOf(e) < 0;
    }, nonReturnableFields);

    selectableFields = selectFiltered.concat(
      nonReturnableFields.map(item => {
        return '-' + item;
      })
    );
  }
  return selectableFields;
};
/*
const deleteNonReturnableFieldsFromObject = (obj, nonReturnableFields) => {
  nonReturnableFields.forEach(element => delete obj._doc[element]);
};

const deleteNonReturnableFieldsFromArray = (arr, nonReturnableFields) => {
  arr.forEach(item => {
    nonReturnableFields.forEach(element => delete item._doc[element]);
  });
};

module.exports = baseService; */

module.exports = {
  baseFind,
  baseFindById,
  baseUpdate,
  baseRemove,
  setAuditInformation
};
