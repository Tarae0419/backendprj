import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookmarks, { onDelete: 'CASCADE' }) // 사용자와의 관계
  user: User;

  @Column()
  itemId: number; // 북마크된 항목의 ID

  @CreateDateColumn()
  createdAt: Date; // 북마크 생성 날짜
}
