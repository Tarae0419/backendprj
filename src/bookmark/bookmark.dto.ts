import { ApiProperty } from '@nestjs/swagger';

export class ToggleBookmarkDto {
  @ApiProperty({ description: '북마크할 항목의 ID', example: 123 })
  itemId: number;
}

export class BookmarkPaginationDto {
  @ApiProperty({ description: '페이지 번호', default: 1, example: 1 })
  page: number;

  @ApiProperty({ description: '페이지당 항목 수', default: 10, example: 10 })
  limit: number;
}
