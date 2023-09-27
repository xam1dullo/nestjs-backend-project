import { Injectable } from '@nestjs/common';
import { UpdateLocationsSocketDto } from './dto/update-locations-socket.dto';
import { Location } from '@prisma/client';
import {
  CustomLocationCreateInput,
  LocationsService,
} from '../../../locations/locations.service';

@Injectable()
export class LocationsSocketService {
  constructor(private readonly locationsService: LocationsService) {}
  async create(
    createLocationsSocketDto: CustomLocationCreateInput,
  ): Promise<Location> {
    const location = await this.locationsService.create(
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
    console.log(id, updateLocationsSocketDto);
    return `This action updates a #${id} locationsSocket`;
  }

  remove(id: number) {
    return `This action removes a #${id} locationsSocket`;
  }
}
