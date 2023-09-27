import { Module } from '@nestjs/common';
import { Server } from 'socket.io';
import { BullModule } from '@nestjs/bull';
import { EventQueueService } from './event-queue.service';
import { EventQueueProcessor } from './event-queue.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'events',
    }),
  ],
  controllers: [],
  providers: [EventQueueProcessor, EventQueueService, Server],
  exports: [EventQueueService],
})
export class EventQueuesModule {}
