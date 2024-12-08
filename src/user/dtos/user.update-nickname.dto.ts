import { PartialType, PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UpdateNicknameDto extends PartialType(
  PickType(UserDto, ['nickname'] as const),
) {}
