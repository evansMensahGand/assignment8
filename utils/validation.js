import joi from "joi"

export const registerValidator = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email:joi.string().email().required(),
  password:joi.string().required().min(8)
})


export const loginValidator = joi.object({
    email:joi.string().email().required(),
  password:joi.string().required().min(8)
})