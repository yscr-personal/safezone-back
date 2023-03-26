import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Group } from '@prisma/client';
import { CreateGroupDto } from './interfaces';

@Injectable()
export class GroupsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Group> {
    return await this.prisma.group.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<Group[]> {
    return await this.prisma.group.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    });
  }

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return await this.prisma.group.create({
      data: {
        name: createGroupDto.name,
        users: {
          connect: createGroupDto.membersIds.map((userId) => ({ id: userId })),
        },
      },
    });
  }
}
