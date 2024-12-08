import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { JobService } from './jobs.service';
import { JobFilterDto } from './jobs.dto';

@ApiTags('채용 공고')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @ApiOperation({ summary: '공고 목록 조회' })
  @Get()
  async getJobs(@Query() filterDto: JobFilterDto) {
    return this.jobService.getJobs(filterDto);
  }

  @ApiOperation({ summary: '공고 상세 조회' })
  @Get(':id')
  async getJobById(@Param('id') id: number) {
    return this.jobService.getJobById(id);
  }

  @ApiOperation({ summary: '관련 공고 추천' })
  @Get(':id/related')
  async getRelatedJobs(@Param('id') id: number) {
    return this.jobService.getRelatedJobs(id);
  }
}
