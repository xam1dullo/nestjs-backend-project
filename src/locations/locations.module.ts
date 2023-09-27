import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EventQueuesModule } from '../common/queue/event-queue.module';
import { PrismaService } from '../prisma/prisma.service';
import { EventQueueService } from '../common/queue/event-queue.service';
import { EventsService } from '../events/events.service';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    PrismaModule,
    EventQueuesModule,
    BullModule.registerQueue({
      name: 'events',
    }),
    EventsModule,
  ],
  controllers: [LocationsController],
  providers: [
    LocationsService,
    PrismaService,
    EventQueueService,
    EventsService,
  ],
  exports: [LocationsService],
})
export class LocationsModule {}
