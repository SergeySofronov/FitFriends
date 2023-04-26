import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CertificateValidationPipe implements PipeTransform {
  constructor(
    private readonly configService: ConfigService,
  ) { }
  transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    const extensionFilter = this.configService.get<string>('file.certificateFilterExp');
    console.log(extensionFilter)
    if (!file.originalname.match(new RegExp(extensionFilter))) {
      throw new HttpException('Not allowed file extension', HttpStatus.PAYLOAD_TOO_LARGE,);
    }

    // "value" is an object containing the file's attributes and metadata
    // const oneKb = 1000;
    // return value.size < oneKb;
    console.log(file)
    console.log(metadata.metatype)
    console.log(this.configService.get<number>('file.certificateUploadFolder'))
    return true;
  }
}
