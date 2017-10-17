const Joi = require('joi');

module.exports = {
  create: create,
  update: update,
  show: show,
  all: all,
  remove: remove,
  add: add
};

const schema = {
  id: Joi
    .number()
    .integer()
    .min(0),
  first_name: Joi
    .string()
    .min(1)
    .max(120)
    .trim(),
  last_name: Joi
    .string()
    .min(1)
    .max(120)
    .trim(),
  email: Joi
    .string()
    .email()
    .max(120)
    .trim(),
  gender: Joi.string()
    .required()
    .valid(['Female', 'Male'])
};

function add () {
  return {};
}

function create () {
  return {
    payload: Joi.object({
      first_name: schema
        .first_name
        .required(),
      last_name: schema
        .last_name
        .required(),
      email: schema
        .email
        .required(),
      gender: schema
        .gender
        .required()
    })
  };
}

function update () {
  return {
    params: {
      id: schema
        .id
        .required()
    },
    payload: Joi.object({
      first_name: schema
        .first_name
        .optional(),
      last_name: schema
        .last_name
        .optional(),
      email: schema
        .email
        .optional(),
      gender: schema
        .gender
        .optional()
    })
  };
}

function show () {
  return {
    params: {
      id: schema
        .id
        .required()
    }
  };
}

function all () {
  return {
    query: {
      gender: schema
        .gender
        .optional()
    }
  };
}

function remove () {
  return {
    params: {
      id: schema
        .id
        .required()
    }
  };
}
