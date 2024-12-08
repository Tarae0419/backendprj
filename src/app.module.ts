import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Company } from './company/entities/company.entity';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { JobModule } from './jobs/jobs.module';
import { User } from './user/user.entity';
import { Bookmark } from './bookmark/bookmark.entity';
import { Application } from './application/application.entity';
import { Job } from './jobs/jobs.entity';

@Module({
  imports: [
    CompanyModule,
    UserModule,
    ApplicationModule,
    BookmarkModule,
    JobModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'WSD3',
      password: '1234',
      database: 'company',
      entities: [Company, User, Application, Bookmark, Job],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
