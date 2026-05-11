import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { NotificationChannel } from './enums/notification-channel.enum';
import { NotificationType } from './enums/notification-type.enum';
import { Notification } from './notification.entity';

type CreateNotificationInput = {
  recipientId: number;
  actorId?: number | null;
  title: string;
  message: string;
  href?: string | null;
  imageUrl?: string | null;
  type?: NotificationType;
  channel?: NotificationChannel;
  metadata?: Record<string, unknown> | null;
  skipPush?: boolean;
};

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(input: CreateNotificationInput) {
    const recipient = await this.userRepository.findOne({
      where: { id: input.recipientId },
    });

    if (!recipient) {
      throw new NotFoundException('Notification recipient not found');
    }

    const actor = input.actorId
      ? await this.userRepository.findOne({ where: { id: input.actorId } })
      : null;

    const notification = await this.notificationRepository.save(
      this.notificationRepository.create({
        recipient,
        actor,
        title: input.title,
        message: input.message,
        href: input.href ?? null,
        imageUrl: input.imageUrl ?? null,
        type: input.type ?? NotificationType.Info,
        channel: input.channel ?? NotificationChannel.InApp,
        metadata: input.metadata ?? null,
      }),
    );

    return notification;
  }

  async createMany(inputs: CreateNotificationInput[]) {
    const notifications: Notification[] = [];

    for (const input of inputs) {
      notifications.push(await this.create(input));
    }

    return notifications;
  }

  async getMine(user: ActiveUserData, limit = 20) {
    const take = Math.min(Math.max(Number(limit) || 20, 1), 50);
    const notifications = await this.notificationRepository.find({
      where: { recipient: { id: user.sub } },
      relations: ['actor'],
      order: { createdAt: 'DESC' },
      take,
    });

    return notifications.map((notification) => this.toResponse(notification));
  }

  async getUnreadCount(user: ActiveUserData) {
    const count = await this.notificationRepository
      .createQueryBuilder('notification')
      .where('notification.recipientId = :userId', { userId: user.sub })
      .andWhere('notification.readAt IS NULL')
      .getCount();

    return { count };
  }

  async markRead(id: number, user: ActiveUserData) {
    const notification = await this.getNotificationForUser(id, user);
    notification.readAt = notification.readAt ?? new Date();
    const saved = await this.notificationRepository.save(notification);

    return this.toResponse(saved);
  }

  async markClicked(id: number, user: ActiveUserData) {
    const notification = await this.getNotificationForUser(id, user);
    const now = new Date();
    notification.readAt = notification.readAt ?? now;
    notification.clickedAt = notification.clickedAt ?? now;
    const saved = await this.notificationRepository.save(notification);

    return this.toResponse(saved);
  }

  async markAllRead(user: ActiveUserData) {
    await this.notificationRepository
      .createQueryBuilder()
      .update(Notification)
      .set({ readAt: new Date() })
      .where('"recipientId" = :userId', { userId: user.sub })
      .andWhere('"readAt" IS NULL')
      .execute();

    return { message: 'Notifications marked as read' };
  }

  async delete(id: number, user: ActiveUserData) {
    await this.getNotificationForUser(id, user);
    await this.notificationRepository.delete(id);

    return { message: 'Notification deleted' };
  }

  private async getNotificationForUser(id: number, user: ActiveUserData) {
    const notification = await this.notificationRepository.findOne({
      where: { id },
      relations: ['recipient', 'actor'],
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    if (notification.recipient.id !== user.sub) {
      throw new ForbiddenException('You can only access your notifications');
    }

    return notification;
  }

  private toResponse(notification: Notification) {
    return {
      id: notification.id,
      title: notification.title,
      message: notification.message,
      href: notification.href,
      imageUrl: notification.imageUrl,
      type: notification.type,
      channel: notification.channel,
      metadata: notification.metadata,
      readAt: notification.readAt,
      clickedAt: notification.clickedAt,
      createdAt: notification.createdAt,
      actor: notification.actor
        ? {
            id: notification.actor.id,
            firstName: notification.actor.firstName,
            lastName: notification.actor.lastName,
            email: notification.actor.email,
          }
        : null,
    };
  }

}
