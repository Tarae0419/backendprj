import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { CreateApplicationDto, ApplicationFilterDto } from './application.dto';
import { JwtAuthGuard } from '../user/jwt/user.jwt.guard';

@ApiTags('지원 관리') // Swagger에서 이 컨트롤러는 "지원 관리" 섹션에 표시됩니다.
@ApiBearerAuth() // JWT 인증을 사용하는 엔드포인트에 적용
@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @ApiOperation({ summary: '지원하기' }) // API 요약
  @ApiResponse({
    status: 201,
    description: '지원 성공',
    schema: {
      example: {
        id: 1,
        jobId: 123,
        resumeUrl: 'https://example.com/resume.pdf',
        status: 'pending',
        createdAt: '2024-12-08T12:34:56.789Z',
      },
    },
  })
  @ApiResponse({ status: 409, description: '이미 지원한 공고' })
  @Post()
  async createApplication(
    @Request() req,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    const user = req.user;
    return this.applicationService.createApplication(
      user,
      createApplicationDto.jobId,
      createApplicationDto.resumeUrl,
    );
  }

  @ApiOperation({ summary: '지원 내역 조회' })
  @ApiResponse({
    status: 200,
    description: '지원 목록 조회 성공',
    schema: {
      example: {
        total: 2,
        page: 1,
        limit: 10,
        applications: [
          {
            id: 1,
            jobId: 123,
            resumeUrl: 'https://example.com/resume.pdf',
            status: 'pending',
            createdAt: '2024-12-08T12:34:56.789Z',
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @Get()
  async getApplications(
    @Request() req,
    @Query() applicationFilterDto: ApplicationFilterDto,
  ) {
    const user = req.user;
    return this.applicationService.getApplications(
      user,
      applicationFilterDto.status,
      applicationFilterDto.page,
      applicationFilterDto.limit,
    );
  }

  @ApiOperation({ summary: '지원 취소' })
  @ApiResponse({
    status: 200,
    description: '지원 취소 성공',
    schema: {
      example: {
        id: 1,
        jobId: 123,
        resumeUrl: 'https://example.com/resume.pdf',
        status: 'cancelled',
        createdAt: '2024-12-08T12:34:56.789Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: '지원 내역을 찾을 수 없음' })
  @ApiResponse({ status: 409, description: '취소할 수 없는 상태' })
  @ApiParam({ name: 'id', description: '취소할 지원 ID' }) // 경로 매개변수 설명
  @Delete(':id')
  async cancelApplication(@Request() req, @Param('id') id: number) {
    const user = req.user;
    return this.applicationService.cancelApplication(user, id);
  }
}
