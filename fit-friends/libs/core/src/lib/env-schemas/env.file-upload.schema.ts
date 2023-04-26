import * as Joi from 'joi';

export const envFileUploadSchema = Joi.object({
  FILE_UPLOAD_DEST: Joi
    .string()
    .required(),
  AVATAR_MAX_SIZE: Joi
    .number()
    .required(),
  CERTIFICATE_MAX_SIZE: Joi
    .number()
    .required(),
  TRAINING_VIDEO_MAX_SIZE: Joi
    .number()
    .required(),
  CERTIFICATE_FILTER_REGEXP: Joi
    .string()
    .required(),
  IMAGE_FILTER_REGEXP: Joi
    .string()
    .required(),
  VIDEO_FILTER_REGEXP: Joi
    .string()
    .required(),
  DEFAULT_RESOURCE_FOLDER: Joi
    .string()
    .required(),
  DEFAULT_AVATAR_FOLDER: Joi
    .string()
    .required(),
  DEFAULT_TRAINING_BACKGROUND_IMAGES_FOLDER: Joi
    .string()
    .required(),
  DEFAULT_TRAINING_VIDEO_FOLDER: Joi
    .string()
    .required(),
  DEFAULT_AVATAR: Joi
    .string()
    .required(),
  DEFAULT_TRAINING_VIDEO: Joi
    .string()
    .required(),
  AVATAR_UPLOAD_DEST: Joi
    .string()
    .required(),
  CERTIFICATE_UPLOAD_DEST: Joi
    .string()
    .required(),
  TRAINING_VIDEO_UPLOAD_DEST: Joi
    .string()
    .required(),
});
