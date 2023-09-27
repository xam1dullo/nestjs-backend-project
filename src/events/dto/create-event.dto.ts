import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @IsUUID()
  @ApiProperty()
  @IsOptional()
  userId?: string;

  @IsDateString()
  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @ApiProperty()
  @IsNotEmpty()
  endDate: Date;

  @IsUUID()
  @ApiProperty()
  @IsOptional()
  locationId?: string;
}
