import * as Joi from 'joi';

export const envFrontendUrlSchema = Joi.object({
  FRONTEND_PRIVATE_URL: Joi
  .string()
  .uri()
  .required(),
});
