import { PartialType, PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class LoginDto extends PartialType(
  PickType(UserDto, ['email', 'password'] as const),
) {}
