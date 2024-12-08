import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Entity()
export class Company {
  @ApiProperty({
    type: Number,
    description: 'company Id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: '회사이름',
  })
  @IsString()
  @Column({ type: 'varchar', length: 64 })
  name: string;

  @ApiProperty({
    type: String,
    description: '회사 설명',
  })
  @IsString()
  @Column({ type: 'varchar' })
  content: string;
}
