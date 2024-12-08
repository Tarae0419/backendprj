import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  FindOperator,
} from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; // 포지션 제목

  @Column()
  company: string; // 회사명

  @Column({ nullable: true })
  location: string; // 지역

  @Column({ nullable: true })
  experienceLevel: string; // 경력 요구사항 (예: 'Junior', 'Senior')

  @Column({ nullable: true })
  salary: string; // 급여 정보 (예: '5000만원', '시급 20,000원')

  @Column('simple-array', { nullable: true })
  techStack: string[] | FindOperator<string>; // 기술 스택 (예: ['React', 'Node.js'])

  @Column({ nullable: true })
  description: string; // 공고 설명

  @Column({ default: 0 })
  views: number; // 조회수

  @CreateDateColumn()
  createdAt: Date; // 공고 생성 날짜

  @UpdateDateColumn()
  updatedAt: Date; // 공고 수정 날짜
}
