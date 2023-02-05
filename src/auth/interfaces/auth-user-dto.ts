import { User } from '@prisma/client';

export interface AuthUserDto extends Omit<User, 'password'> {
  access_token: string;
}
