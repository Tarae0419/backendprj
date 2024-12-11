import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filter/exception.filter';
import { PerformanceInterceptor } from './interceptor/performance.interceptor';
import { Logger, LogLevel } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('구인구직 API')
    .setDescription('구인구직 API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  // 로그 레벨 설정 (개발: 모든 로그, 프로덕션: 에러 및 경고만)
  const logLevels: LogLevel[] =
    process.env.NODE_ENV === 'production'
      ? ['error', 'warn']
      : ['log', 'error', 'warn', 'debug', 'verbose'];
  Logger.overrideLogger(logLevels);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new PerformanceInterceptor());

  await app.listen(process.env.PORT ?? 18103);
}

bootstrap();
