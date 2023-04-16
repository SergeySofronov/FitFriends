import { Injectable, Logger } from '@nestjs/common';
import { NotifyRepository } from './notify.repository';
import { NotifyQuery } from './query/notify.query';
import { Notification } from '@fit-friends/shared-types';
import { NotificationNotFoundIdException, NotificationNotOwnerIdException, NotificationsNotFoundException } from '@fit-friends/core';

@Injectable()
export class NotifyService {
  constructor(
    private readonly notifyService: NotifyRepository,
    private readonly logger: Logger,
  ) { }

  private async checkNotificationOwner(id: number, notifiedUserId: number) {
    const notification = await this.getNotificationById(id);
    if (notification.notifiedUserId !== notifiedUserId) {
      throw new NotificationNotOwnerIdException(this.logger, id, notifiedUserId);
    }
  }

  async getNotificationById(id: number): Promise<Notification> {
    const existNotification = await this.notifyService.findById(id);
    if (!existNotification) {
      throw new NotificationNotFoundIdException(this.logger, id);
    }

    return existNotification;
  }

  public async getNotifications(query: NotifyQuery, notifiedUserId: number): Promise<Notification[]> {
    const notifications = await this.notifyService.find(query, { notifiedUserId });
    if (!notifications?.length) {
      throw new NotificationsNotFoundException(this.logger);
    }

    return notifications;
  }

  public async deleteNotification(id: number, notifiedUserId: number) {
    await this.checkNotificationOwner(id, notifiedUserId);
    return this.notifyService.destroy(id);
  }
}
