import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateEventsQueueDto {
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
  userId: string;

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
  location: Prisma.LocationCreateInput;

  @IsUUID()
  @ApiProperty()
  @IsOptional()
  id: string;

  @IsUUID()
  @ApiProperty()
  @IsOptional()
  eventId?: string;
}
