import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class PaginationDto {
  @IsDateString()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'date-time' })
  start?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'date-time' })
  end?: string;

  @IsString()
  @IsOptional()
  limit?: string;

  @IsString()
  @IsOptional()
  offset?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  event?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  location?: string;
}
