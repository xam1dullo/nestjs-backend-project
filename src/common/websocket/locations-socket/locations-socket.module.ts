import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { LocationsSocketService } from './locations-socket.service';
import { LocationsSocketGateway } from './locations-socket.gateway';
import { LocationsService } from '../../../locations/locations.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { EventsService } from '../../../events/events.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { EventQueueService } from '../../../common/queue/event-queue.service';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'events',
    }),
  ],
  providers: [
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
