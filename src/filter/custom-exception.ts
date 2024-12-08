import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * 인증 관련 에러 (401 Unauthorized)
 */
export class AuthenticationError extends HttpException {
  constructor(message = 'Authentication failed') {
    super(
      {
        status: 'error',
        message,
        code: 'AUTHENTICATION_ERROR',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

/**
 * 데이터 포맷 관련 에러 (400 Bad Request)
 */
export class ValidationError extends HttpException {
  constructor(message = 'Invalid data format') {
    super(
      {
        status: 'error',
        message,
        code: 'VALIDATION_ERROR',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
