import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorDetails {
  message: string;
  code?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // HTTP 상태 코드 결정
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 에러 메시지 및 상세 정보
    const errorResponse: { message: string } = { message: 'An error occurred' };
    console.log(errorResponse.message);

    const errorDetails =
      typeof errorResponse === 'object'
        ? (errorResponse as ErrorDetails)
        : { message: 'Unknown error' };

    // 표준 에러 응답 형식
    const errorPayload = {
      status: 'error',
      message: errorDetails.message || 'Internal server error',
      code: errorDetails.code || 'INTERNAL_ERROR',
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // 에러 로그 출력
    this.logger.error(
      `HTTP ${status} Error:`,
      JSON.stringify({
        path: request.url,
        method: request.method,
        status,
        error: errorPayload.message,
        stack: exception instanceof Error ? exception.stack : undefined,
      }),
    );

    this.logger.error(
      `HTTP ${status} Error: ${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : JSON.stringify(exception),
    );

    // 클라이언트에 응답
    response.status(status).json(errorPayload);
  }
}
