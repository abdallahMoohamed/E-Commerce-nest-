import * as joi from 'joi'
export const signUpSchema = {
  body: joi.object({
    userName: joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().required(),
    confirmPassword:joi.string().valid(joi.ref('password')).required()

  })
}