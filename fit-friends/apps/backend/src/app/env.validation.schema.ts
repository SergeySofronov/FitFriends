import { envAppPortSchema, envFileUploadSchema, envFrontendUrlSchema, envJwtSchema, envMailSchema } from '@fit-friends/core';
import Joi from 'joi';

export const envValidationSchema = Joi.object()
  .concat(envAppPortSchema)
  .concat(envFrontendUrlSchema)
  .concat(envJwtSchema)
  .concat(envMailSchema)
  .concat(envFileUploadSchema);
