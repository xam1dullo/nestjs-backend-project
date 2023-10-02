import { Injectable, Logger } from '@nestjs/common';
import { Event, Prisma, Location } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EventQueueService } from '../common/queue/event-queue.service';
import { PaginationDto } from './dto/pagination-event.dto';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventQueue: EventQueueService, // private readonly usersService: UsersService,
  ) {}

  async createEvent(data: CreateEventDto): Promise<Event> {
    const query = {
      data: {
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        userId: data.userId,
      },
      include: {
        location: true,
      },
    };

    const existingUser = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!existingUser) {
      throw new Error(`User with id ${existingUser.id} not found.`);
    }

    const event = await this.prisma.event.create(query);

    if (!event) {
      throw new Error(`event with id ${existingUser.id} not found.`);
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
    this.logger.log(' UpdateEventDto UpdateEventDto UpdateEventDto', event);
    if (!query)
      query = {
        where: {
          id: `${event.id}`,
        },
        data: event,
      };
    this.logger.log(query);
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

  async updateEventLocationById(
    id: string,
    locationId: string,
  ): Promise<Event> {
    this.logger.log(
      ' UpdateEventDto UpdateEventDto UpdateEventDto',
      locationId,
      id,
    );
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
  async associateEventWithLocation(
    id: string,
    locationId: string,
  ): Promise<Event> {
    try {
      const updatedEvent = await this.prisma.event.update({
        where: { id },
        data: {
          location: {
            connect: { id: locationId },
          },
        },
      });
      return updatedEvent;
    } catch (error) {
      this.logger.error('Error associating event with location', error);
      throw error;
    }
  }

  async disassociateEventFromLocation(
    id: string,
    locationId: string,
  ): Promise<Event> {
    try {
      const updatedEvent = await this.prisma.event.update({
        where: { id },
        data: {
          location: {
            disconnect: { id: locationId },
          },
        },
      });
      return updatedEvent;
    } catch (error) {
      this.logger.error('Error disassociating event from location', error);
      throw error;
    }
  }

  async getLocationForEvent(id: string): Promise<Location> {
    try {
      const event = await this.prisma.event.findUnique({
        where: { id },
        include: { location: true },
      });

      if (!event) {
        throw new Error(`Event with id ${id} not found.`);
      }

      return event.location;
    } catch (error) {
      this.logger.error('Error fetching locations for event', error);
      throw error;
    }
  }
}
