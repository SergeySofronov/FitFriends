import { ConfigService, registerAs } from '@nestjs/config';
import { MulterModuleOptions } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { extname, resolve } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

export const fileUploadOptions = registerAs('file', () => ({
  dest: process.env.FILE_UPLOAD_DEST,
  avatarSize: parseInt(process.env.AVATAR_MAX_SIZE, 10),
  certificateSize: parseInt(process.env.CERTIFICATE_MAX_SIZE, 10),
  trainingVideoSize: parseInt(process.env.TRAINING_VIDEO_MAX_SIZE, 10),
  certificateFilterExp: process.env.CERTIFICATE_FILTER_REGEXP,
  imageFilterExp: process.env.IMAGE_FILTER_REGEXP,
  videoFilterExp: process.env.VIDEO_FILTER_REGEXP,
  certificateUploadFolder: process.env.CERTIFICATE_UPLOAD_DEST,
  defaultAvatar: process.env.DEFAULT_AVATAR,
  avatarUploadFolder: process.env.AVATAR_UPLOAD_DEST,
  defaultAvatarFolder: process.env.DEFAULT_AVATAR_FOLDER,
  defaultTrainingVideo: process.env.DEFAULT_TRAINING_VIDEO,
  trainingVideoUploadFolder: process.env.TRAINING_VIDEO_UPLOAD_DEST,
  defaultTrainingVideoFolder: process.env.DEFAULT_TRAINING_VIDEO_FOLDER,
  defaultTrainingBackgroundFolder: process.env.DEFAULT_TRAINING_BACKGROUND_IMAGES_FOLDER,
  defaultResourceFolder: process.env.DEFAULT_RESOURCE_FOLDER,
}));

function getFileName() {
  return ((_req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 10).toString(10))
      .join('');
    callback(null, `${name}${randomName}${fileExtName}`)
  });
}

function getFileDestination(configService: ConfigService) {
  return ((req: Request, _file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
    const folderName = `${req['user']['sub']}`;
    console.log(configService.get<string>('file.dest'));
    const folderPath = resolve(__dirname, configService.get<string>('file.dest'), folderName);
    const isFolderExists = existsSync(folderPath) || mkdirSync(folderPath, { recursive: true });

    if (isFolderExists) {
      return callback(null, folderPath);
    }

    return callback(new HttpException('Error while attempt to create file', HttpStatus.BAD_REQUEST,), '');
  });
}

function getFileFilter(filter: string) {
  return ((_req: Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    if (!file.originalname.match(new RegExp(filter))) {
      return callback(
        new HttpException(
          'Not allowed file extension',
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }

    return callback(null, true);
  })
}

export async function getTrainingVideoUploadConfig(configService: ConfigService): Promise<MulterModuleOptions> {
  return {
    dest: configService.get<string>('file.dest'),
    limits: {
      fileSize: configService.get<number>('file.trainingVideoSize'),
    },
    storage:
      diskStorage({
        destination: getFileDestination(configService),
        filename: getFileName(),
      }),
    fileFilter: getFileFilter(configService.get<string>('file.videoFilterExp')),
  }
}
