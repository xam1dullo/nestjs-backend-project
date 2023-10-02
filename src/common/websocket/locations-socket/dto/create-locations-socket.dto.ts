import { IsString } from 'class-validator';

export class CreateLocationsSocketDto {
  @IsString()
  name: string;
}
