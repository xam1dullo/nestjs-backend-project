import { Prisma } from '@prisma/client';

export class EventQueueEntity {
  name: string;
  description: string;
  userId?: string;
  startDate: Date;
  endDate: Date;
  location: Prisma.LocationCreateInput;
  eventId: string;
}
