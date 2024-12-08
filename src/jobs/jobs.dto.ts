import { ApiProperty } from '@nestjs/swagger';

export class JobFilterDto {
  @ApiProperty({ description: '페이지 번호', default: 1, example: 1 })
  page: number;

  @ApiProperty({ description: '페이지당 항목 수', default: 20, example: 20 })
  limit: number;

  @ApiProperty({ description: '지역 필터', required: false, example: 'Seoul' })
  location?: string;

  @ApiProperty({ description: '경력 필터', required: false, example: 'Junior' })
  experienceLevel?: string;

  @ApiProperty({
    description: '급여 필터',
    required: false,
    example: '5000만원',
  })
  salary?: string;

  @ApiProperty({
    description: '기술 스택 필터',
    required: false,
    example: 'React',
  })
  techStack?: string;

  @ApiProperty({
    description: '정렬 기준 (예: createdAt, views)',
    required: false,
    example: 'views',
  })
  sortBy?: string;

  @ApiProperty({
    description: '키워드 검색',
    required: false,
    example: 'developer',
  })
  keyword?: string;
}
