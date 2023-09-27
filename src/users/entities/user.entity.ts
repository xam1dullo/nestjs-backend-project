import { ApiProperty } from '@nestjs/swagger';
import { User, Prisma } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  events?: Prisma.EventCreateNestedManyWithoutUserInput;
}
