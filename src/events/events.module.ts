import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ChatGateway } from './chat.gateway';
import { EventsService } from './events.service';
import { GeolocationGateway } from './geolocation.gateway';
import { NotificationsGateway } from './notifications.gateway';

@Module({
  imports: [AuthModule],
  providers: [
    ChatGateway,
    GeolocationGateway,
    NotificationsGateway,
    EventsService,
  ],
})
export class EventsModule {}
