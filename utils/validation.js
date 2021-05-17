const joi = require("joi");

const registerValidator = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required().min(8),
});

const loginValidator = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(8),
});

module.exports = {
  registerValidator,
  loginValidator,
};
