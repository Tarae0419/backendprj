import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application, ApplicationStatus } from './application.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  // 지원 추가
  async createApplication(
    user: User,
    jobId: number,
    resumeUrl?: string,
  ): Promise<Application> {
    // 중복 지원 체크
    const existingApplication = await this.applicationRepository.findOne({
      where: { user, jobId },
    });
    if (existingApplication) {
      throw new ConflictException('Already applied to this job');
    }

    const application = this.applicationRepository.create({
      user,
      jobId,
      resumeUrl,
    });
    return this.applicationRepository.save(application);
  }

  // 지원 내역 조회
  async getApplications(user: User, status?: string, page = 1, limit = 10) {
    const query = this.applicationRepository
      .createQueryBuilder('application')
      .where('application.userId = :userId', { userId: user.id })
      .orderBy('application.createdAt', 'DESC') // 날짜별 정렬
      .skip((page - 1) * limit)
      .take(limit);

    if (status) {
      query.andWhere('application.status = :status', { status });
    }

    const [applications, total] = await query.getManyAndCount();

    return {
      total,
      page,
      limit,
      applications,
    };
  }

  // 지원 취소
  async cancelApplication(
    user: User,
    applicationId: number,
  ): Promise<Application> {
    const application = await this.applicationRepository.findOne({
      where: { id: applicationId, user },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (application.status !== ApplicationStatus.Pending) {
      throw new ConflictException('Cannot cancel this application');
    }

    application.status = ApplicationStatus.Cancelled;
    return this.applicationRepository.save(application);
  }
}
