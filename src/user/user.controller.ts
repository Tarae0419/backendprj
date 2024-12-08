import {
  Controller,
  Post,
  Put,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/user.register.dto';
import { LoginDto } from './dtos/user.login.dto';
import { UpdateNicknameDto } from './dtos/user.update-nickname.dto';
import { JwtAuthGuard } from './jwt/user.jwt.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('유저 정보')
@Controller('auth')
export class UserController {
  constructor(private readonly authService: UserService) {}

  // 회원가입
  @ApiOperation({
    summary: '회원가입',
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  // 로그인
  @ApiOperation({
    summary: '로그인',
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // 토큰 갱신
  @ApiOperation({
    summary: '토큰 갱신',
  })
  @Post('refresh')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  // 회원 정보 수정
  @ApiOperation({
    summary: '회원 정보 수정',
  })
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateNickname(
    @Request() req,
    @Body() updateNicknameDto: UpdateNicknameDto,
  ) {
    return this.authService.updateNickname(
      req.user.id,
      updateNicknameDto.nickname,
    );
  }
}
