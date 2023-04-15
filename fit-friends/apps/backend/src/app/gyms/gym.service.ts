import { Injectable, Logger } from '@nestjs/common';
import { Gym } from '@fit-friends/shared-types';
import { GymQuery } from './query/gym.query';
import { GymRepository } from './gym.repository';
import { GymNotFoundIdException, GymsNotFoundException } from '@fit-friends/core';

@Injectable()
export class GymService {
  constructor(
    private readonly gymRepository: GymRepository,
    private readonly logger: Logger,
  ) { }

  async getGymById(id: number): Promise<Gym> {
    const existGym = await this.gymRepository.findById(id);
    if (!existGym) {
      throw new GymNotFoundIdException(this.logger, id);
    }

    return existGym;
  }


  async getGyms(query: GymQuery): Promise<Gym[]> {
    const gyms = await this.gymRepository.find(query);
    if (!gyms?.length) {
      throw new GymsNotFoundException(this.logger);
    }

    return gyms;
  }

  async addFavoriteGym(gymId: number, userId: number): Promise<Gym> {
    return this.gymRepository.addFavoriteGym(gymId, userId);
  }

  async removeFavoriteGym(gymId: number, userId: number): Promise<Gym> {
    return this.gymRepository.removeFavoriteGym(gymId, userId);
  }

  async getFavoriteGyms(query: GymQuery, userId: number): Promise<Gym[]> {
    const gyms = await this.gymRepository.find(query, { user: { every: { id: userId } } });
    if (!gyms?.length) {
      throw new GymsNotFoundException(this.logger);
    }

    return gyms;
  }
}
