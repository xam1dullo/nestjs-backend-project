import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationsSocketDto } from './create-locations-socket.dto';

export class UpdateLocationsSocketDto extends PartialType(
  CreateLocationsSocketDto,
) {
  id: number;
}
