import { Injectable, Logger } from '@nestjs/common';
import { GroupsRepository } from './groups.repository';

@Injectable()
export class GroupsService {
  private readonly logger = new Logger(GroupsService.name);

  constructor(private readonly groupsRepository: GroupsRepository) {}

  async findByUserId(userId: string) {
    return await this.groupsRepository.findByUserId(userId);
  }
}
