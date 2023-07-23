import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Result } from './result.interface';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Result> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: 200,
          message: '响应成功',
          data: data,
        };
      }),
    );
  }
}
