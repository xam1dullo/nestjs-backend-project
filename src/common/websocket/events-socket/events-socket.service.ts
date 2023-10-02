import { Injectable } from '@nestjs/common';
import { Event, Prisma } from '@prisma/client';
import { EventsService } from '../../../events/events.service';
import { CreateEventDto } from '../../../events/dto/create-event.dto';

@Injectable()
export class EventsSocketService {
  constructor(private readonly eventsService: EventsService) {}
  async create(
    createEventsSocketDto: CreateEventDto,
  ): Promise<Prisma.EventCreateManyInput> {
    const newEvent = await this.eventsService.createEvent(
      createEventsSocketDto,
    );
    return newEvent;
  }

  findAll(paginationDto) {
    this.eventsService.getEvents(paginationDto);
    return `This action returns all eventsSocket`;
  }

  async findOne(id: string): Promise<Event> {
    const event: Event = await this.eventsService.getEventById(id);
    return event;
  }

  async update(
    updateEventsSocketDto: Prisma.EventUpdateInput,
  ): Promise<Prisma.EventUpdateInput> {
    const event = await this.eventsService.updateEvent(updateEventsSocketDto);
    return event;
  }

  async remove(id: string): Promise<Event> {
    return await this.eventsService.deleteEventById(id);
  }
}
