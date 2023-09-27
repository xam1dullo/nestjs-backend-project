import { Injectable, Logger } from '@nestjs/common';
import { Event, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EventQueueService } from '../common/queue/event-queue.service';
import { PaginationDto } from './dto/pagination-event.dto';
import { UsersService } from '../users/users.service';

export type CustomEventCreateInput = Prisma.EventCreateInput & {
  userId: string;
};

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventQueue: EventQueueService,
    private readonly usersService: UsersService,
  ) {}

  async createEvent(
    data: Prisma.EventCreateInput,
    userId?: string,
  ): Promise<Event> {
    const query = {
      data,
      include: {
        location: true,
      },
    };
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error(`User with id ${data.id} not found.`);
    }

    const event = await this.prisma.event.create(query);

    if (!event) {
      throw new Error(`event with id ${data.id} not found.`);
    }

    await this.eventQueue.addEvent({
      userId: event.userId,
      name: event.name,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location,
      id: event.id,
    });

    return event;
  }

  async updateEvent(
    event: Prisma.EventUpdateInput,
    query?: any,
  ): Promise<Event> {
    console.log(' UpdateEventDto UpdateEventDto UpdateEventDto', event);
    if (!query)
      query = {
        where: {
          id: `${event.id}`,
        },
        data: event,
      };
    console.log(query);
    const existingEvent = await this.prisma.event.findUnique({
      where: { id: `${event.id ? event.id : query.where.id}` },
    });

    if (!existingEvent) {
      throw new Error(`Event with id ${event.id} not found.`);
    }

    const newEvent = this.prisma.event.update(query);

    this.logger.log(newEvent);
    await this.eventQueue.updateEvent(newEvent);

    return newEvent;
  }

  async deleteEventById(id: string): Promise<Event> {
    const where = {
      where: {
        id: id,
      },
    };
    const event: Event = await this.prisma.event.delete(where);
    await this.eventQueue.deleteEvent(id);
    return event;
  }

  async getEvents(paginationDto: PaginationDto): Promise<Event[] | any> {
    const { start, end, location, limit, offset, event } = paginationDto;

    const where: Prisma.EventWhereInput = {
      ...(start && { startDate: { gte: new Date(start) } }),
      ...(end && { endDate: { lte: new Date(end) } }),
      ...(location && { location: { name: { contains: location } } }),
      ...(event && {
        OR: [
          { name: { contains: event } },
          { description: { contains: event } },
        ],
      }),
    };
    const query = {
      where,
      take: +limit || 10,
      skip: +offset || 0,
    };
    const events = this.prisma.event.findMany(query);
    return events;
  }

  async getEventById(id: string): Promise<Event> {
    this.logger.log('LOG Event one find');
    this.logger.log(id);
    const query = {
      where: {
        id,
      },
      include: {
        location: true,
      },
    };
    const event: Event = await this.prisma.event.findUnique(query);
    return event;
  }

  async getEventsReadyToStart(currentDate: Date): Promise<Event[]> {
    const query = {
      where: {
        startDate: {
          lte: currentDate,
        },
      },
    };
    const events: Event[] = await this.prisma.event.findMany(query);
    return events;
  }

  async updateEventLocationById({
    id,
    locationId,
  }: {
    id: string;
    locationId: string;
  }): Promise<Event> {
    console.log(' UpdateEventDto UpdateEventDto UpdateEventDto', event);
    const query = {
      where: {
        id,
      },
      data: {
        locationId,
      },
    };

    const newEvent = this.prisma.event.update(query);
    await this.eventQueue.updateEvent(newEvent);

    return newEvent;
  }
}
