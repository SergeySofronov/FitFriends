import * as Joi from 'joi';

export const envJwtSchema = Joi.object({
  JWT_AT_SECRET: Joi
    .string()
    .required(),
  JWT_RT_SECRET: Joi
    .string()
    .required(),
  JWT_AT_EXPIRES_IN: Joi
    .string()
    .required(),
  JWT_RT_EXPIRES_IN: Joi
    .string()
    .required()
});
