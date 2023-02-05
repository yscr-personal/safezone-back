import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  constructor(private readonly authService: AuthService) {}

  async getUserFromSocket(socket: Socket) {
    const { token } = socket.handshake.auth;
    this.logger.log(socket);
    return await this.authService.validateToken(token);
  }
}
