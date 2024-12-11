import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { JobModule } from './jobs/jobs.module';
import { User } from './user/user.entity';
import { Bookmark } from './bookmark/bookmark.entity';
import { Application } from './application/application.entity';
import { Job } from './jobs/jobs.entity';
import { LoggerMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [
    UserModule,
    ApplicationModule,
    BookmarkModule,
    JobModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '113.198.66.75',
      port: 13103,
      username: 'WSD3',
      password: '1234',
      database: 'company',
      entities: [User, Application, Bookmark, Job],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
