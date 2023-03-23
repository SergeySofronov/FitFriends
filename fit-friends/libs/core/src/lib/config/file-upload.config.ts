import { ConfigService, registerAs } from '@nestjs/config';
import { MulterModuleOptions } from '@nestjs/platform-express/multer';

export const fileUploadOptions = registerAs('file', () => ({
  dest: process.env.FILE_UPLOAD_DEST,
  fileSize: parseInt(process.env.FILE_MAX_SIZE, 10),
  imageFilterExp: process.env.IMAGE_FILTER_REGEXP,
  videoFilterExp: process.env.VIDEO_FILTER_REGEXP,
  defaultAvatar: process.env.DEFAULT_AVATAR,
  defaultResourceFolder: process.env.DEFAULT_RESOURCE_FOLDER,

}));

export async function getFileUploadConfig(configService: ConfigService): Promise<MulterModuleOptions> {
  return {
    dest: configService.get<string>('file.dest'),
    limits: {
      fileSize: configService.get<number>('file.fileSize'),
    },
  }
}
