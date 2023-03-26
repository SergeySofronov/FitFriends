import { getRandomInteger, TrainingNotFoundIdException, TrainingNotOwnerIdException, TrainingsNotFoundException, UserNotFoundIdException } from '@fit-friends/core';
import { Training } from '@fit-friends/shared-types';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, readdirSync, unlinkSync } from 'fs';
import { resolve } from 'path';
import { UserRepository } from '../users/user.repository';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { TrainingQuery } from './query/training.query';
import { TrainingValidity } from './training.constant';
import { TrainingEntity } from './training.entity';
import { TrainingRepository } from './training.repository';

@Injectable()
export class TrainingService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly trainingRepository: TrainingRepository,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) { }

  public async createTraining(dto: CreateTrainingDto, coachId: number) {
    const existCoach = await this.userRepository.findById(coachId);
    const video = this.configService.get<string>('file.defaultTrainingVideo');
    let backgroundImage = '';

    if (!existCoach) {
      throw new UserNotFoundIdException(this.logger, coachId);
    }

    const resourceFolder = this.configService.get<string>('file.defaultResourceFolder');
    const imageFolder = this.configService.get<string>('file.defaultTrainingBackgroundFolder');
    const imagePath = resolve(__dirname, resourceFolder, imageFolder);

    try {
      const files = readdirSync(imagePath, { withFileTypes: true });
      const random = getRandomInteger(0, files.length);
      backgroundImage = files[random].name;
    }
    catch (error) {
      throw new BadRequestException('Internal error. Cannot create entity');
    }

    const newTraining = new TrainingEntity({ ...dto, video, coachId, backgroundImage, rating: TrainingValidity.RatingMinValue });

    return this.trainingRepository.create(newTraining);
  }

  public async updateTraining(id: number, dto: Partial<UpdateTrainingDto>): Promise<Training> {
    const existCoach = await this.trainingRepository.findById(id);

    if (!existCoach) {
      throw new TrainingNotFoundIdException(this.logger, id);
    }

    if (existCoach.coachId !== dto.coachId) {
      throw new TrainingNotOwnerIdException(this.logger, id, dto.coachId);
    }

    return this.trainingRepository.update(id, dto);
  }

  public async updateTrainingBackground(id: number, backgroundImage: string): Promise<Training> {
    const existTraining = await this.trainingRepository.findById(id);
    if (!existTraining) {
      throw new TrainingNotFoundIdException(this.logger, id);
    }

    const currentImage = existTraining?.backgroundImage;

    if (currentImage && backgroundImage) {
      const imagePath = resolve(
        __dirname,
        this.configService.get<string>('file.dest'),
        existTraining.id.toString(),
        currentImage
      );
      if (existsSync(imagePath)) {
        unlinkSync(imagePath);
      }
    }

    return this.trainingRepository.update(id, { ...existTraining, backgroundImage, updatedAt: new Date() });
  }


  public async getTrainingBackgroundPath(id: number, coachId: number): Promise<string> {
    const existTraining = await this.trainingRepository.findById(id);
    if (!existTraining) {
      throw new TrainingNotFoundIdException(this.logger, id);
    }

    if (existTraining.coachId !== coachId) {
      throw new TrainingNotOwnerIdException(this.logger, id, coachId);
    }

    const resourceFolder = this.configService.get<string>('file.defaultResourceFolder');
    const imageFolder = this.configService.get<string>('file.defaultTrainingBackgroundFolder');
    const imagePath = resolve(__dirname, resourceFolder, imageFolder);
    let isDefaultImage = false;

    try {
      const files = readdirSync(imagePath, { withFileTypes: true });
      isDefaultImage = files.map(item => item.name).includes(existTraining.backgroundImage);
    }
    catch (error) {
      throw new BadRequestException('Internal error. Cannot create entity');
    }

    console.log(isDefaultImage);
    const defaultBackgroundFolder = this.configService.get<string>('file.defaultTrainingBackgroundFolder');
    if (isDefaultImage) {
      return resolve(__dirname, this.configService.get<string>('file.defaultResourceFolder'), defaultBackgroundFolder, existTraining.backgroundImage);
    }

    return resolve(__dirname, `${this.configService.get<string>('file.dest')}/${existTraining.id.toString()}/${existTraining.backgroundImage}`);
  }

  public async updateTrainingVideo(id: number, video: string): Promise<Training> {
    const existTraining = await this.trainingRepository.findById(id);
    if (!existTraining) {
      throw new TrainingNotFoundIdException(this.logger, id);
    }

    const currentVideo = existTraining?.backgroundImage;

    if (currentVideo && video) {
      const videoPath = resolve(
        __dirname,
        this.configService.get<string>('file.dest'),
        existTraining.id.toString(),
        currentVideo
      );
      if (existsSync(videoPath)) {
        unlinkSync(videoPath);
      }
    }

    return this.trainingRepository.update(id, { ...existTraining, video, updatedAt: new Date() });
  }

  public async getTrainingVideoPath(id: number, coachId: number): Promise<string> {
    const existTraining = await this.trainingRepository.findById(id);
    if (!existTraining) {
      throw new TrainingNotFoundIdException(this.logger, id);
    }

    if (existTraining.coachId !== coachId) {
      throw new TrainingNotOwnerIdException(this.logger, id, coachId);
    }

    const defaultVideo = `${this.configService.get<string>('file.defaultTrainingVideoFolder')}/${this.configService.get<string>('file.defaultTrainingVideo')}`;
    if (existTraining.backgroundImage === defaultVideo) {
      return resolve(__dirname, this.configService.get<string>('file.defaultResourceFolder'), defaultVideo, existTraining.backgroundImage);
    }

    return resolve(__dirname, `${this.configService.get<string>('file.dest')}/${existTraining.id.toString()}/${existTraining.backgroundImage}`);
  }

  async getTrainings(query: TrainingQuery): Promise<Training[]> {
    const existTraining = await this.trainingRepository.find(query);
    if (!existTraining?.length) {
      throw new TrainingsNotFoundException(this.logger);
    }
    return existTraining;
  }

  async getTraining(id: number): Promise<Training> {
    const existTraining = await this.trainingRepository.findById(id);
    if (!existTraining) {
      throw new TrainingNotFoundIdException(this.logger, id);
    }

    return existTraining;
  }
}
