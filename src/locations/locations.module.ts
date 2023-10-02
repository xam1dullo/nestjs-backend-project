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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    EventQueuesModule,
    ConfigModule,
    BullModule.registerQueue({
      name: 'events',
    }),
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
