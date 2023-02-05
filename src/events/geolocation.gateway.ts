import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventsService } from './events.service';
import { SendLocationPayload } from './interfaces/send-location-payload';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GeolocationGateway implements OnGatewayConnection {
  private readonly logger = new Logger(GeolocationGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(private readonly eventsService: EventsService) {}

  async handleConnection(socket: Socket) {
    this.logger.debug(`Client ${socket.id} connected to geolocation`);
  }

  @SubscribeMessage('send_location')
  async listenForLocationChanges(@MessageBody() payload: SendLocationPayload) {
    this.logger.debug(
      `[GeolocationGateway] received location from ${payload.userId}`,
    );
    this.server.sockets.emit('receive_location_update', {
      ...payload,
      user_id: payload.userId,
      timestamp: new Date(),
    });
  }
}
