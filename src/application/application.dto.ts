import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ description: '지원할 공고 ID', example: 123 })
  jobId: number;

  @ApiProperty({
    description: '이력서 URL (선택)',
    required: false,
    example: 'https://example.com/resume.pdf',
  })
  resumeUrl?: string;
}

export class ApplicationFilterDto {
  @ApiProperty({
    description: '상태 필터 (예: pending, accepted, rejected)',
    required: false,
    example: 'pending',
  })
  status?: string;

  @ApiProperty({ description: '페이지 번호', default: 1, example: 1 })
  page: number;

  @ApiProperty({ description: '페이지당 항목 수', default: 10, example: 10 })
  limit: number;
}
