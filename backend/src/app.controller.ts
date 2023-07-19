import { Controller, Get, Header, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, interval, map } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('/sse')
  @Sse()
  @Header('Content-type', 'text/event-stream')
  sse(): Observable<any> {
    return interval(1000).pipe(map((_) => ({ data: 'hello world2' })));
  }
}
