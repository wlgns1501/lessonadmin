import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BusinessException, ErrorDomain } from './business-exception-filter';
import { log } from 'console';

export interface ApiError {
  id: string;
  domain: ErrorDomain;
  message: string | object;
  timestamp: Date;
}

@Catch(Error)
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CustomExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    let body: ApiError;
    let status: HttpStatus;
    console.log(exception);

    if (exception instanceof BusinessException) {
      body = {
        id: exception.id,
        message: exception.apiMessage,
        domain: exception.domain,
        timestamp: exception.timestamp,
      };
      status = exception.status;
    } else if (exception instanceof HttpException) {
      body = new BusinessException(
        'admin',
        exception.message,
        exception.getResponse(),
        exception.getStatus(),
      );

      status = exception.getStatus();
    } else {
      body = new BusinessException(
        'admin',
        `Internal error occurred: ${exception.message}`,
        'Internal error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.logger.error(
      `Got an exception: ${JSON.stringify({
        path: request.url,
        ...body,
      })}`,
    );

    response.status(status).json(body);
  }
}
