import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EventQueuesModule } from '../common/queue/event-queue.module';
import { EventQueueService } from '../common/queue/event-queue.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    PrismaModule,
    EventQueuesModule,
    BullModule.registerQueue({
      name: 'events',
    }),
    UsersModule,
  ],
  controllers: [EventsController],
  providers: [EventsService, PrismaService, EventQueueService, UsersService],
  exports: [EventsService],
})
export class EventsModule {}
