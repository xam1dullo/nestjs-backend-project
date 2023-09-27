import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Prisma } from '@prisma/client';
import { LocationsSocketService } from './locations-socket.service';
import { UpdateLocationsSocketDto } from './dto/update-locations-socket.dto';
import { CustomLocationCreateInput } from '../../../locations/locations.service';

@WebSocketGateway()
export class LocationsSocketGateway {
  constructor(
    private readonly locationsSocketService: LocationsSocketService,
  ) {}

  @SubscribeMessage('createLocation')
  async create(
    @MessageBody() createLocationsSocketDto: CustomLocationCreateInput,
  ): Promise<Prisma.LocationCreateInput> {
    const location = await this.locationsSocketService.create(
      createLocationsSocketDto,
    );
    return location;
  }

  @SubscribeMessage('findAllLocation')
  findAll() {
    return this.locationsSocketService.findAll();
  }

  @SubscribeMessage('findOneLocation')
  findOne(@MessageBody() id: number) {
    return this.locationsSocketService.findOne(id);
  }

  @SubscribeMessage('updateLocation')
  update(@MessageBody() updateLocationsSocketDto: UpdateLocationsSocketDto) {
    return this.locationsSocketService.update(
      updateLocationsSocketDto.id,
      updateLocationsSocketDto,
    );
  }

  @SubscribeMessage('removeLocation')
  remove(@MessageBody() id: number) {
    return this.locationsSocketService.remove(id);
  }
}
