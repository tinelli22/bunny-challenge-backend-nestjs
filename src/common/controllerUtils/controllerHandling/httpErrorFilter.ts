import 'dotenv/config';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { CustomException } from './customException';
import { ResponseDefaultType } from 'src/common/types/responseDefault';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger();
  }
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    console.log('exception:', exception);

    const statusCode =
      exception instanceof HttpException ||
      exception instanceof CustomException ||
      exception instanceof BadRequestException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ||
      exception instanceof CustomException ||
      exception instanceof BadRequestException
        ? exception.message
        : 'Internal server error';

    const devErrorResponse: ResponseDefaultType = {
      statusCode,
      success: false,
      data: {
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        errorName: exception?.name,
        stackTrace: exception?.stack,
      },
      message: exception?.response?.message || exception?.message || message,
    };

    const prodErrorResponse: ResponseDefaultType = {
      statusCode,
      success: false,
      data: null,
      message,
    };

    this.logger.log(
      `request method: ${request.method} request url${request.url}`,
      JSON.stringify(devErrorResponse)
    );

    response
      .status(statusCode)
      .json(
        process.env.NODE_ENV === 'development'
          ? devErrorResponse
          : prodErrorResponse
      );
  }
}
