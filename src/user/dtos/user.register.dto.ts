import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 64)
  name: string;

  @IsString()
  @Length(8, 128)
  password: string;

  @IsString()
  @Length(3, 64)
  nickname: string;
}
