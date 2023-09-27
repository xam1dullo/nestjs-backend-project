import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EventsSocketService } from './events-socket.service';
import { EventsSocketGateway } from './events-socket.gateway';
import { EventsService } from '../../../events/events.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { EventQueueService } from '../../../common/queue/event-queue.service';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'events',
    }),
  ],
  providers: [
    EventsSocketGateway,
    EventsSocketService,
    EventsService,
    PrismaService,
    EventQueueService,
  ],
  exports: [EventsSocketService],
})
export class EventsSocketModule {}
