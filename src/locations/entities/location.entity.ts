import { Prisma } from '@prisma/client';

export class LocationEntity {
  id: string;
  name: string;
  events: Prisma.EventCreateManyUserInput;
}
