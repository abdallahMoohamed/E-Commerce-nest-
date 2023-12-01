import * as joi from 'joi'

export const signUpSchema = {
  body: joi.object({
    userName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
  }).required()
}

export const loginSchema = {
  body: joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/)).required(),
  }).required()
}


export const activateAccountSchema = {
  body: joi.object({}).required(),
  param: joi.object({
    activationCode: joi.string().required()
  }).required()
}

export const forgetCodeSchema = {
  body: joi.object({
    email: joi.string().email().required()
  }).required()
}
export const resetPasswordSchema = {
  body: joi.object({
    code: joi.number().positive().integer().required(),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    confrimPassword: joi.string().valid(joi.ref('password')).required(),
  }).required()
}