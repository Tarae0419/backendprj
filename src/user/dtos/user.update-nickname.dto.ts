import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateNicknameDto {
  @ApiProperty({ description: 'New nickname for the user' })
  @IsString()
  @Length(3, 64) // 닉네임은 최소 3자, 최대 64자
  nickname: string;
}
