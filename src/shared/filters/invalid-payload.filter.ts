import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { InvalidPayloadError } from '../errors/invalid-payload.error';

@Catch(InvalidPayloadError)
export class InvalidPayloadExceptionFilter implements ExceptionFilter {
  public catch(exception: InvalidPayloadError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(HttpStatus.BAD_REQUEST).send();
  }
}
