import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bookmark } from './bookmark.entity';
import { User } from '../user/user.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
  ) {}

  // 북마크 토글
  async toggleBookmark(user: User, itemId: number): Promise<string> {
    const existingBookmark = await this.bookmarkRepository.findOne({
      where: { user, itemId },
    });

    if (existingBookmark) {
      await this.bookmarkRepository.remove(existingBookmark); // 북마크 제거
      return 'Bookmark removed';
    } else {
      const newBookmark = this.bookmarkRepository.create({ user, itemId });
      await this.bookmarkRepository.save(newBookmark); // 북마크 추가
      return 'Bookmark added';
    }
  }

  // 북마크 목록 조회
  async getBookmarks(user: User, page: number, limit: number) {
    const [bookmarks, total] = await this.bookmarkRepository.findAndCount({
      where: { user },
      order: { createdAt: 'DESC' }, // 최신순 정렬
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      total,
      page,
      limit,
      bookmarks,
    };
  }
}
