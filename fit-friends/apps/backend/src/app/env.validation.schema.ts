import { envAppPortSchema, envFileUploadSchema, envFrontendUrlSchema, envJwtSchema } from '@fit-friends/core';
import Joi from 'joi';

export const envValidationSchema = Joi.object()
  .concat(envAppPortSchema)
  .concat(envFrontendUrlSchema)
  .concat(envJwtSchema)
  .concat(envFileUploadSchema);
