import { Controller, Get, Logger } from '@nestjs/common';
import { UserInfoJwt } from '../users/interfaces';
import { User } from '../users/user.decorator';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  private readonly logger = new Logger(GroupsController.name);

  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async findAll(@User() user: UserInfoJwt) {
    const userId = user.userId;
    this.logger.debug(
      `[${GroupsController.name}] user ${userId} requested his groups`,
    );
    return await this.groupsService.findByUserId(userId);
  }
}
