import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestExistsException, RequestNotFoundIdException, RequestSameUserException, RequestUpdateNotAllowedException } from '@fit-friends/core';
import { RequestRepository } from './request.repository';
import { RequestEntity } from './request.entity';
import { RequestStatus, UserRequest } from '@fit-friends/shared-types';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestService {
  constructor(
    private readonly userService: UserService,
    private readonly requestRepository: RequestRepository,
    private readonly logger: Logger,
  ) { }

  public async getRequestById(id: number) {
    const existReq = await this.requestRepository.findById(id);
    if (!existReq) {
      throw new RequestNotFoundIdException(this.logger, id);
    }

    return existReq;
  }

  public async createRequest(dto: CreateRequestDto, requesterId: number): Promise<UserRequest> {
    const requester = await this.userService.getUserById(requesterId);
    if(requester.id === dto.requestedId){
      throw new RequestSameUserException(this.logger);
    }

    const existRequest = await this.requestRepository.find({ category: dto.category }, { requestedId: dto.requestedId, requesterId });
    if (existRequest) {
      throw new RequestExistsException(this.logger);
    }

    const requestEntity = new RequestEntity({ ...dto, requesterId, status: RequestStatus.Pending });

    return this.requestRepository.create(requestEntity);
  }

  public async updateRequest({ status }: UpdateRequestDto, requestId: number, requestedId: number): Promise<UserRequest> {
    const existRequest = await this.getRequestById(requestId);

    if (existRequest.requestedId !== requestedId) {
      throw new RequestUpdateNotAllowedException(this.logger, existRequest.id, requestedId);
    }

    if (existRequest.status === status) {
      return existRequest;
    }

    return this.requestRepository.update(requestId, { status, updatedAt: new Date() });
  }
}
