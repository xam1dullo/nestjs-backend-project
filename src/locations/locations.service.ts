import { Injectable, Logger } from '@nestjs/common';
import { Location, Prisma } from '@prisma/client';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EventQueueService } from '../common/queue/event-queue.service';
import { EventsService } from '../events/events.service';
import { CreateLocationDto } from './dto/create-location.dto';

export type CustomLocationCreateInput = Prisma.LocationCreateInput & {
  eventId: string;
};

@Injectable()
export class LocationsService {
  private readonly logger = new Logger(LocationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventQueue: EventQueueService,
    private readonly eventsService: EventsService,
  ) {}

  async getLocationForEvent(eventId: string): Promise<Location> {
    const location: Location =
      await this.eventsService.getLocationForEvent(eventId);
    return location;
  }

  async createLocationForEvent(
    eventId: string,
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    const location: Location = await this.prisma.location.create({
      data: createLocationDto,
    });

    await this.eventsService.associateEventWithLocation(eventId, location.id);
    return location;
  }

  async updateLocationForEvent(
    eventId: string,
    locationId: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    this.logger.log({
      locationId,
      eventId,
      updateLocationDto,
    });

    const location: Location = await this.prisma.location.update({
      where: {
        id: locationId,
      },
      data: {
        name: updateLocationDto.name,
      },
    });

    await this.eventsService.updateEventLocationById(eventId, location.id);
    return location;
  }

  async deleteLocationForEvent(
    eventId: string,
    locationId: string,
  ): Promise<Location> {
    const location: Location = await this.prisma.location.delete({
      where: {
        id: locationId,
      },
    });

    await this.eventsService.disassociateEventFromLocation(
      eventId,
      location.id,
    );
    return location;
  }
}
