import { PartialType, PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserDto extends PartialType(
  PickType(UserDto, ['email', 'name', 'password', 'nickname'] as const),
) {}
