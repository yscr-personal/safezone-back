import { Controller, Get, Logger } from '@nestjs/common';
import { UserInfoJwt } from './interfaces';
import { User } from './user.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async findAll(@User() user: UserInfoJwt) {
    const userId = user.userId;
    this.logger.debug(`[${UsersController.name}] user ${userId} request`);
    return await this.usersService.findById(userId);
  }
}
