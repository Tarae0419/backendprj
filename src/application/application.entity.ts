import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

export enum ApplicationStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected',
  Cancelled = 'cancelled',
}

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.applications, { onDelete: 'CASCADE' }) // 지원자는 User와 관계
  user: User;

  @Column()
  jobId: number; // 지원한 공고 ID

  @Column({ nullable: true })
  resumeUrl?: string; // 첨부된 이력서 URL (선택)

  @Column({
    default: ApplicationStatus.Pending,
    type: 'enum',
    enum: ApplicationStatus,
  })
  status: ApplicationStatus; // 지원 상태 (예: 'pending', 'accepted', 'rejected')

  @CreateDateColumn()
  createdAt: Date; // 지원 생성 날짜

  @UpdateDateColumn()
  updatedAt: Date; // 지원 업데이트 날짜
}
