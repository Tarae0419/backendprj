import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './jobs.entity';
import { JobFilterDto } from './jobs.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  // 공고 목록 조회
  async getJobs(filterDto: JobFilterDto) {
    const {
      page = 1,
      limit = 20,
      location,
      experienceLevel,
      salary,
      techStack,
      sortBy = 'createdAt',
      keyword,
    } = filterDto;

    const query = this.jobRepository.createQueryBuilder('job');

    // 필터링
    if (location) query.andWhere('job.location = :location', { location });
    if (experienceLevel)
      query.andWhere('job.experienceLevel = :experienceLevel', {
        experienceLevel,
      });
    if (salary) query.andWhere('job.salary = :salary', { salary });
    if (techStack)
      query.andWhere('job.techStack LIKE :techStack', {
        techStack: `%${techStack}%`,
      });

    // 검색
    if (keyword) {
      query.andWhere(
        '(job.title LIKE :keyword OR job.company LIKE :keyword OR job.description LIKE :keyword)',
        { keyword: `%${keyword}%` },
      );
    }

    // 정렬
    query.orderBy(`job.${sortBy}`, 'DESC');

    // 페이지네이션
    const [jobs, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      total,
      page,
      limit,
      jobs,
    };
  }

  // 공고 상세 조회
  async getJobById(id: number) {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) throw new NotFoundException(`Job with ID ${id} not found`);

    // 조회수 증가
    job.views += 1;
    await this.jobRepository.save(job);

    return job;
  }

  // 관련 공고 추천
  async getRelatedJobs(jobId: number) {
    const job = await this.jobRepository.findOne({ where: { id: jobId } });
    if (!job) throw new NotFoundException(`Job with ID ${jobId} not found`);

    // 관련 공고 추천 (같은 기술 스택 기준)
    return this.jobRepository.find({
      where: { techStack: job.techStack },
      take: 5, // 최대 5개
      order: { createdAt: 'DESC' },
    });
  }
}
