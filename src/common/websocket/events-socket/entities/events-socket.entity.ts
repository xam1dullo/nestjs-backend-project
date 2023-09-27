import { Prisma } from '@prisma/client';

export class EventsSocketEntity {
  id: string;
  name: string;
  description: string;
  user: Prisma.UserCreateInput;
  userId: string;
  startDate: Date;
  endDate: Date;
  locationId: string;
  location: Prisma.LocationCreateInput;
  updatedAt: Date;
  createdAt: Date;
}
