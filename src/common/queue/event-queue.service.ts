import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { EventQueueEntity } from './event-queue.entity';
import { UpdateEventsQueueDto } from './dto/update-events-queue.dto';
import { CreateEventsQueueDto } from './dto/create-events-queue.dto';

@Injectable()
export class EventQueueService {
  constructor(@InjectQueue('events') private readonly eventQueue: Queue) {}

  async addEvent(event: CreateEventsQueueDto): Promise<void> {
    const { name, description, id, startDate, endDate, location, userId } =
      event;
    const now = new Date();
    const startTime = new Date(event.startDate);

    if (startDate > now) {
      const delay = startTime.getTime() - now.getTime();
      await this.eventQueue.add(
        'event',
        {
          name,
          description,
          userId,
          startDate,
          endDate,
          location,
          id,
        },
        { delay },
      );
    }
  }

  async getEvents(): Promise<EventQueueEntity[]> {
    const events = await this.eventQueue.getJobs([
      'active',
      'waiting',
      'delayed',
    ]);
    return events.map((event) => event.data);
  }

  async getEvent(id: string): Promise<EventQueueEntity> {
    const event = await this.eventQueue.getJob(id);
    return event ? event.data : null;
  }

  async updateEvent(
    updatedEvent: Partial<UpdateEventsQueueDto>,
  ): Promise<void> {
    const id: string = updatedEvent.id;

    const existingEvent = await this.eventQueue.getJob(id);

    if (existingEvent) {
      const newEvent = { ...existingEvent.data, ...updatedEvent };

      const { name, description, userId, startDate, endDate, location } =
        newEvent;
      const now = new Date();
      const startTime = new Date(startDate);

      if (startDate > now) {
        const delay = startTime.getTime() - now.getTime();
        await this.eventQueue.removeJobs(id);
        await this.eventQueue.add(
          id,
          {
            name,
            description,
            userId,
            startDate,
            endDate,
            location,
            id,
          },
          { delay },
        );
      }
    }
  }

  async deleteEvent(id: string): Promise<void> {
    await this.eventQueue.removeJobs(id);
  }
}
