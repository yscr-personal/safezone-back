import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './interfaces';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly usersRepository: UsersRepository) {}

  async findById(id: string): Promise<User> {
    try {
      return await this.usersRepository.findById(id);
    } catch (error) {
      this.logger.error(
        `[${UsersService.name}] Fail to find user by id - ${error.message}`,
        error.stack,
      );
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findByEmail(email);
    } catch (error) {
      this.logger.error(
        `[${UsersService.name}] Fail to find user by email - ${error.message}`,
        error.stack,
      );
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      return await this.usersRepository.findByUsername(username);
    } catch (error) {
      this.logger.error(
        `[${UsersService.name}] Fail to find user by username - ${error.message}`,
        error.stack,
      );
    }
  }

  async create(data: CreateUserDto): Promise<User> {
    try {
      return await this.usersRepository.create(data);
    } catch (error) {
      this.logger.error(
        `[${UsersService.name}] Fail to create user - ${error.message}`,
        error.stack,
      );
    }
  }
}
