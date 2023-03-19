import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('FitFriends')
    .setDescription('FitFriends service API')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: 'Enter your Bearer token',
    })
    .build();

  const globalPrefix = 'fit-friends';
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: false });
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true, whitelist: true, skipMissingProperties: false }));

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.getOrThrow<string>('APP_PORT');

  app.enableCors();
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
