import { IsNotEmpty, IsNumber } from 'class-validator';

export class SendLocationPayload {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;
}
