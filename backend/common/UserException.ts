import { HttpException, HttpStatus } from '@nestjs/common';

export class UserException extends HttpException {
  constructor(code: number, message: string, data?: any) {
    super({ code, message, data }, HttpStatus.OK);
  }
}
