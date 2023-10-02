import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { LocationsSocketService } from './locations-socket.service';
import { LocationsSocketGateway } from './locations-socket.gateway';
import { LocationsService } from '../../../locations/locations.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { EventsService } from '../../../events/events.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { EventQueueService } from '../../../common/queue/event-queue.service';
import { UsersModule } from '../../../users/users.module';
import { EventQueuesModule } from '../../queue/event-queue.module';
import { EventsModule } from '../../../events/events.module';
import { LocationsModule } from '../../../locations/locations.module';
import { UsersService } from '../../../users/users.service';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    EventQueuesModule,
    EventsModule,
    LocationsModule,
    BullModule.registerQueue({
      name: 'events',
    }),
  ],
  providers: [
    UsersService,
    EventsService,
    PrismaService,
    EventQueueService,
    LocationsSocketGateway,
    LocationsSocketService,
    LocationsService,
  ],
  exports: [LocationsSocketService],
})
export class LocationsSocketModule {}
