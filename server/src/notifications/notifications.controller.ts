import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import type { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('my')
  getMine(@ActiveUser() user: ActiveUserData, @Query('limit') limit?: string) {
    return this.notificationsService.getMine(user, Number(limit) || 20);
  }

  @Get('my/unread-count')
  getUnreadCount(@ActiveUser() user: ActiveUserData) {
    return this.notificationsService.getUnreadCount(user);
  }

  @Patch(':id/read')
  markRead(
    @Param('id', ParseIntPipe) id: number,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.notificationsService.markRead(id, user);
  }

  @Patch(':id/click')
  markClicked(
    @Param('id', ParseIntPipe) id: number,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.notificationsService.markClicked(id, user);
  }

  @Patch('my/read-all')
  markAllRead(@ActiveUser() user: ActiveUserData) {
    return this.notificationsService.markAllRead(user);
  }

  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.notificationsService.delete(id, user);
  }
}
