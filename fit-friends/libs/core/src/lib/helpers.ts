import { plainToInstance, ClassConstructor, ClassTransformOptions } from 'class-transformer';
import { RequestCategory, RequestCategoryType, RequestStatusType } from '@fit-friends/shared-types'
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';

export function getRandomInteger(a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V, groups?: string[]) {
  const options: ClassTransformOptions = { excludeExtraneousValues: true };
  if (groups) {
    options.groups = [...groups];
  }

  return plainToInstance(someDto, plainObject, options);
}

export function transformToMin(value: unknown, borderMin: number, borderMax: number) {
  const min = +value;
  if (!min || (min < borderMin) || (min > borderMax)) {
    return borderMin;
  }

  return min;
}

export function transformToMax(value: unknown, borderMin: number, borderMax: number) {
  const max = +value;
  if (!max || (max < borderMin) || (max > borderMax)) {
    return borderMax;
  }

  return max;
}

export function transformStringToBool(value: unknown) {
  if ((value === 'true') || (value === '1')) {
    return true;
  }

  if ((value === 'false') || (value === '0')) {
    return false;
  }

  return undefined;
}

export function getNotificationTextOnRequest(category: RequestCategoryType, userName: string) {
  switch (category) {
    case (RequestCategory.Friendship):
      return `The user ${userName} wants to add you as a friend`;

    case (RequestCategory.Personal):
      return `The user ${userName} wants to invite you to a joint workout`;

    case (RequestCategory.Coworking):
      return `The user ${userName} wants to sign up for a personal training session`;

    default: return '';
  }
}

export function getNotificationTextOnRequestAction(category: RequestCategoryType, status: RequestStatusType, userName: string) {
  switch (category) {
    case (RequestCategory.Friendship):
      return `The user ${userName} ${status} your friend request`;

    case (RequestCategory.Personal):
      return `The user ${userName}  ${status} your request for a joint workout`;

    case (RequestCategory.Coworking):
      return `The user ${userName} ${status} your request for a personal training session`;

    default: return '';
  }
}

export function getNotificationTextOnFriendRemove(userName: string) {
  return `The user ${userName} has removed you from the friends list`;
}

export function getFileName(file: Express.Multer.File) {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 10).toString(10))
    .join('');
  return `${name}${randomName}${fileExtName}`;
}

export function isFolderExistsOrCreate(path: string) {
  const isFolderExists = existsSync(path) || mkdirSync(path, { recursive: true });
  if (!isFolderExists) {
    new HttpException('Error while attempt to create file', HttpStatus.BAD_REQUEST);
  }
}
