import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookmarkService } from './bookmark.service';
import { ToggleBookmarkDto, BookmarkPaginationDto } from './bookmark.dto';
import { JwtAuthGuard } from '../user/jwt/user.jwt.guard';

@ApiTags('북마크')
@ApiBearerAuth()
@Controller('bookmarks')
@UseGuards(JwtAuthGuard)
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @ApiOperation({ summary: '북마크 추가/제거' })
  @Post()
  async toggleBookmark(
    @Request() req,
    @Body() toggleBookmarkDto: ToggleBookmarkDto,
  ) {
    const user = req.user;
    return this.bookmarkService.toggleBookmark(user, toggleBookmarkDto.itemId);
  }

  @ApiOperation({ summary: '북마크 목록 조회' })
  @Get()
  async getBookmarks(
    @Request() req,
    @Query() paginationDto: BookmarkPaginationDto,
  ) {
    const user = req.user;
    return this.bookmarkService.getBookmarks(
      user,
      paginationDto.page,
      paginationDto.limit,
    );
  }
}
