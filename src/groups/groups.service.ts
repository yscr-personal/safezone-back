import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GroupsService {
  constructor(private readonly UsersService: UsersService) {}

  async findByUserId(userId: string) {
    return [
      {
        id: '1',
        name: 'Group 1',
        members: [await this.UsersService.findById(userId)],
      },
    ];
  }
}
