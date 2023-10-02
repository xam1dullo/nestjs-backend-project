import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Location } from '@prisma/client';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationsService } from './locations.service';

@Controller('events')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get(':eventId/locations')
  async getLocationsForEvent(
    @Param('eventId') eventId: string,
  ): Promise<Location> {
    return this.locationsService.getLocationForEvent(eventId);
  }

  @Post(':eventId/locations')
  async createLocationForEvent(
    @Param('eventId') eventId: string,
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return this.locationsService.createLocationForEvent(
      eventId,
      createLocationDto,
    );
  }

  @Patch(':eventId/locations/:locationId')
  async updateLocationForEvent(
    @Param('eventId') eventId: string,
    @Param('locationId') locationId: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    return this.locationsService.updateLocationForEvent(
      eventId,
      locationId,
      updateLocationDto,
    );
  }

  @Delete(':eventId/locations/:locationId')
  async deleteLocationForEvent(
    @Param('eventId') eventId: string,
    @Param('locationId') locationId: string,
  ): Promise<void> {
    await this.locationsService.deleteLocationForEvent(eventId, locationId);
  }
}
