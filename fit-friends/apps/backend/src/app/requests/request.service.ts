import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { CreateRequestDto } from './dto/create-request.dto';
import {
  RequestExistsException, RequestNotFoundIdException, RequestSameUserException,
  RequestUpdateNotAllowedException, RequestsNotFoundException, getNotificationTextOnRequest,
  getNotificationTextOnRequestAction
} from '@fit-friends/core';
import { RequestRepository } from './request.repository';
import { RequestEntity } from './request.entity';
import { RequestCategory, RequestStatus, UserRequest } from '@fit-friends/shared-types';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestQuery } from './query/request.query';
import { NotifyService } from '../notify/notify.service';

@Injectable()
export class RequestService {
  constructor(
    private readonly notifyService: NotifyService,
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
    await this.userService.getUserById(dto.requestedId);
    const requester = await this.userService.getUserById(requesterId);
    if (requester.id === dto.requestedId) {
      throw new RequestSameUserException(this.logger);
    }

    const existRequest = await this.requestRepository.find({ category: dto.category }, { requestedId: dto.requestedId, requesterId });
    if (existRequest.length) {
      throw new RequestExistsException(this.logger);
    }

    const requestEntity = new RequestEntity({ ...dto, requesterId, status: RequestStatus.Pending });

    await this.notifyService.createNotification({
      notifiedUserId: requestEntity.requestedId,
      notifyingUserId: requestEntity.requesterId,
      text: getNotificationTextOnRequest(requestEntity.category, requester.name),
      isChecked: false,
    });

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

    const requested = await this.userService.getUserById(requestedId);

    //Rejected or Accepted notification
    await this.notifyService.createNotification({
      notifiedUserId: existRequest.requestedId,
      notifyingUserId: existRequest.requesterId,
      text: getNotificationTextOnRequestAction(existRequest.category, status, requested.name),
      isChecked: false,
    });

    //Friendship accepted, adding new friend
    if ((status === RequestStatus.Accepted) && existRequest.category === RequestCategory.Friendship) {
      await this.userService.addFriend(existRequest.requesterId, existRequest.requestedId);
    }

    return this.requestRepository.update(requestId, { status, updatedAt: new Date() });
  }

  async getRequests(query: RequestQuery, requestedId: number): Promise<UserRequest[]> {
    const existRequests = await this.requestRepository.find(query, { requestedId });
    if (!existRequests?.length) {
      throw new RequestsNotFoundException(this.logger);
    }
    return existRequests;
  }
}
