import { Injectable } from '@nestjs/common';
import { Location, Prisma } from '@prisma/client';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EventQueueService } from '../common/queue/event-queue.service';
import { EventsService } from '../events/events.service';

export type CustomLocationCreateInput = Prisma.LocationCreateInput & {
  eventId: string;
};

@Injectable()
export class LocationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventQueue: EventQueueService,
    private readonly eventsService: EventsService,
  ) {}
  async create(
    createLocationDto: CustomLocationCreateInput,
  ): Promise<Location> {
    const query = {
      data: {
        name: createLocationDto.name,
      },
    };
    const location = await this.prisma.location.create(query);
    const eventQuery = {
      where: {
        id: createLocationDto.eventId,
      },
      data: {
        locationId: location.id,
      },
    };
    await this.eventsService.updateEvent({}, eventQuery);
    return location;
  }

  async findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return updateLocationDto;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
