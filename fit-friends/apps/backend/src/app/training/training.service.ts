import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getRandomInteger, TrainingNotFoundIdException, TrainingNotOwnerIdException, TrainingsNotFoundException, UserBalanceZeroException, UserNotFoundIdException } from '@fit-friends/core';
import { OrderCategory, Training } from '@fit-friends/shared-types';
import { existsSync, readdirSync, unlinkSync } from 'fs';
import { resolve } from 'path';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { TrainingQuery } from './query/training.query';
import { TrainingValidity as TV } from './training.constant';
import { TrainingEntity } from './training.entity';
import { TrainingRepository } from './training.repository';
import { UserService } from '../users/user.service';
import { UserBalanceService } from '../user-balance/user-balance.service';

@Injectable()
export class TrainingService {
  constructor(
    private readonly userService: UserService,
    private readonly balanceService: UserBalanceService,
    private readonly trainingRepository: TrainingRepository,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) { }

  private async checkTrainingOwner(id: number, coachId: number): Promise<Training> {
    const user = await this.userService.getUserById(coachId);
    const training = await this.getTrainingById(id);
    if (user.id !== training.coachId) {
      throw new TrainingNotOwnerIdException(this.logger, id, coachId);
    }

    return training;
  }

  async getTrainingById(id: number): Promise<Training> {
    const existTraining = await this.trainingRepository.findById(id);
    if (!existTraining) {
      throw new TrainingNotFoundIdException(this.logger, id);
    }

    return existTraining;
  }

  public async createTraining(dto: CreateTrainingDto, coachId: number) {
    const existCoach = await this.userService.getUserById(coachId);
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
      const random = getRandomInteger(0, files.length - 1);
      backgroundImage = files[random].name;
    }
    catch (error) {
      throw new BadRequestException('Internal error. Cannot create entity');
    }

    const newTraining = new TrainingEntity({ ...dto, video, coachId, backgroundImage, rating: TV.RatingMinValue });
    const training = await this.trainingRepository.create(newTraining);
    this.userService.sendEmailToSubscribedUsers(coachId, training);

    return training;
  }

  public async updateTraining(id: number, dto: UpdateTrainingDto): Promise<Training> {
    await this.checkTrainingOwner(id, dto.coachId);
    return this.trainingRepository.update(id, dto);
  }

  public async updateTrainingVideo(id: number, coachId: number, video: string): Promise<Training> {
    const existTraining = await this.checkTrainingOwner(id, coachId);

    const currentVideo = existTraining?.video;

    if (currentVideo && video) {
      const videoPath = resolve(
        __dirname,
        this.configService.get<string>('file.dest'),
        this.configService.get<string>('file.trainingVideoUploadFolder'),
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
    const balance = await this.balanceService.getUserBalanceByService(OrderCategory.Training, id, coachId);
    if (!balance.available) {
      throw new UserBalanceZeroException(this.logger);
    }

    const existTraining = await this.getTrainingById(id);
    if (existTraining.coachId !== coachId) {
      throw new TrainingNotOwnerIdException(this.logger, id, coachId);
    }

    const defaultVideo = `${this.configService.get<string>('file.defaultTrainingVideoFolder')}/${this.configService.get<string>('file.defaultTrainingVideo')}`;
    if (existTraining.backgroundImage === defaultVideo) {
      return resolve(
        __dirname,
        this.configService.get<string>('file.defaultResourceFolder'),
        defaultVideo,
        existTraining.video
      );
    }

    return resolve(
      __dirname,
      this.configService.get<string>('file.dest'),
      this.configService.get<string>('file.trainingVideoUploadFolder'),
      existTraining.id.toString(),
      existTraining.video
    );
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
