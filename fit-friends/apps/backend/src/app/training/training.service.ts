import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getRandomInteger, TrainingNotFoundIdException, TrainingNotOwnerIdException, TrainingsNotFoundException, UserNotFoundIdException } from '@fit-friends/core';
import { Training } from '@fit-friends/shared-types';
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

  private async checkTrainingOwner(id: number, userId: number) {
    const user = await this.checkUserExist(userId);
    const training = await this.getTrainingById(id);
    if (user.id !== training.coachId) {
      throw new TrainingNotOwnerIdException(this.logger, id, userId);
    }
  }

  public async checkUserExist(userId: number) {
    const existUser = await this.userRepository.findById(userId);
    if (!existUser) {
      throw new UserNotFoundIdException(this.logger, userId);
    }
    return existUser;
  }

  async getTrainingById(id: number): Promise<Training> {
    const existTraining = await this.trainingRepository.findById(id);
    if (!existTraining) {
      throw new TrainingNotFoundIdException(this.logger, id);
    }

    return existTraining;
  }

  public async createTraining(dto: CreateTrainingDto, coachId: number) {
    const existCoach = await this.userRepository.findById(coachId);
    if (!existCoach) {
      throw new UserNotFoundIdException(this.logger, coachId);
    }

    let backgroundImage = '';
    const video = this.configService.get<string>('file.defaultTrainingVideo');
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

  public async updateTraining(id: number, dto: UpdateTrainingDto): Promise<Training> {
    await this.checkTrainingOwner(id, dto.coachId);
    return this.trainingRepository.update(id, dto);
  }

  public async updateTrainingVideo(id: number, video: string): Promise<Training> {
    const existTraining = await this.getTrainingById(id);

    const currentVideo = existTraining?.video;

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
    const existTraining = await this.getTrainingById(id);

    if (existTraining.coachId !== coachId) {
      throw new TrainingNotOwnerIdException(this.logger, id, coachId);
    }

    const defaultVideo = `${this.configService.get<string>('file.defaultTrainingVideoFolder')}/${this.configService.get<string>('file.defaultTrainingVideo')}`;
    if (existTraining.backgroundImage === defaultVideo) {
      return resolve(__dirname, this.configService.get<string>('file.defaultResourceFolder'), defaultVideo, existTraining.video);
    }

    return resolve(__dirname, `${this.configService.get<string>('file.dest')}/${existTraining.id.toString()}/${existTraining.video}`);
  }

  async getCoachTrainings(query: TrainingQuery, coachId: number): Promise<Training[]> {
    const existTraining = await this.trainingRepository.find(query, { coachId });
    if (!existTraining?.length) {
      throw new TrainingsNotFoundException(this.logger);
    }
    return existTraining;
  }

  async getTrainings(query: TrainingQuery): Promise<Training[]> {
    const existTraining = await this.trainingRepository.find(query);
    if (!existTraining?.length) {
      throw new TrainingsNotFoundException(this.logger);
    }
    return existTraining;
  }

  public async deleteTraining(orderId: number, userId: number) {
    await this.checkTrainingOwner(orderId, userId);
    return this.trainingRepository.destroy(orderId);
  }
}
