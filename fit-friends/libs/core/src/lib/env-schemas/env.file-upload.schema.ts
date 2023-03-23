import * as Joi from 'joi';

export const envFileUploadSchema = Joi.object({
  FILE_UPLOAD_DEST: Joi
    .string()
    .required(),
  FILE_MAX_SIZE: Joi
    .number()
    .required(),
  IMAGE_FILTER_REGEXP: Joi
    .string()
    .required(),
});
