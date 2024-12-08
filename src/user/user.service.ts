import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/user.register.dto';
import { LoginDto } from './dtos/user.login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 회원가입
  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, name, nickname } = createUserDto;

    // 이메일 중복 검사
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // 사용자 정보 저장
    const user = this.userRepository.create({
      email,
      password,
      name,
      nickname,
    });
    return this.userRepository.save(user);
  }

  // 로그인
  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 비밀번호 검증
    const hashedPassword = Buffer.from(user.password, 'base64').toString(
      'utf-8',
    );
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // JWT 토큰 발급
    const payload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Refresh 토큰 저장
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);

    // 로그인 이력 저장 (예: 로그 테이블 추가 가능)
    // TODO: Implement logging functionality

    return { accessToken, refreshToken };
  }

  // 토큰 갱신
  async refreshToken(oldRefreshToken: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { refreshToken: oldRefreshToken },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  // 회원 정보 수정
  async updateNickname(userId: number, newNickname: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    user.nickname = newNickname;
    return this.userRepository.save(user);
  }
}
