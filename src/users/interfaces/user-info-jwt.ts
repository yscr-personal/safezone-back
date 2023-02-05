import { IsNotEmpty } from 'class-validator';

export class UserInfoJwt {
  @IsNotEmpty()
  userId: string;
}
