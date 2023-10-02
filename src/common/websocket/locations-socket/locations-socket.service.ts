import { Injectable, Logger } from '@nestjs/common';
import { UpdateLocationsSocketDto } from './dto/update-locations-socket.dto';
import { Location } from '@prisma/client';
import { CreateLocationsSocketDto } from './dto/create-locations-socket.dto';
import { LocationsService } from '../../../locations/locations.service';

@Injectable()
export class LocationsSocketService {
  private readonly logger = new Logger(LocationsSocketService.name);
  constructor(private readonly locationsService: LocationsService) {}
  async create(
    eventId: string,
    createLocationsSocketDto: CreateLocationsSocketDto,
  ): Promise<Location> {
    const location = await this.locationsService.createLocationForEvent(
      eventId,
      createLocationsSocketDto,
    );
    return location;
  }

  findAll() {
    return `This action returns all locationsSocket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} locationsSocket`;
  }

  update(id: number, updateLocationsSocketDto: UpdateLocationsSocketDto) {
    this.logger.log(id, updateLocationsSocketDto);
    return `This action updates a #${id} locationsSocket`;
  }

  remove(id: number) {
    return `This action removes a #${id} locationsSocket`;
  }
}
