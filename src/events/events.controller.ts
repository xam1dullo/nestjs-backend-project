import { CreateEventDto } from './dto/create-event.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Event, Prisma } from '@prisma/client';
import { ApiResponse } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaginationDto } from './dto/pagination-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

export interface JwtPayload {
  userId: string;
  refreshToken: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    event: CreateEventDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<Prisma.EventCreateInput> {
    const newEvent = await this.eventsService.createEvent({
      ...event,
      ...req.user,
    });
    return newEvent;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, type: [Event] })
  findAll(
    @Query(new ValidationPipe())
    paginationDto: PaginationDto,
  ): Promise<Event[]> {
    console.log(paginationDto);
    return this.eventsService.getEvents(paginationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.getEventById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Prisma.EventUpdateInput> {
    const event = await this.eventsService.updateEvent({
      ...updateEventDto,
      id,
    });
    return event;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') { id }: { id: string },
  ): Promise<Prisma.EventUpdateInput> {
    const event = await this.eventsService.deleteEventById(id);
    return event;
  }
}
