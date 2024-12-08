import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Unique(['email'])
@Entity()
export class User {
  @ApiProperty({
    type: Number,
    description: 'user id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'email',
  })
  @IsString()
  @Column({ type: 'varchar' })
  email: string;

  @ApiProperty({
    type: String,
    description: 'user name',
  })
  @IsString()
  @Column({ type: 'varchar', length: 64 })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Password (hashed and Base64-encoded)',
  })
  @IsString()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = Buffer.from(hashedPassword).toString('base64');
  }

  @ApiProperty({ description: 'refresh token', required: false })
  @IsString()
  @Column({ type: 'varchar', nullable: true }) // Refresh 토큰 저장
  refreshToken: string | null;

  @ApiProperty({
    type: String,
    description: 'Nickname',
  })
  @IsString()
  @Length(3, 64)
  @Column({ type: 'varchar', length: 64 })
  nickname: string;
}
