import {
  Controller,
  Get,
  Header,
  Sse,
  UploadedFile,
  UseInterceptors,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, interval, map } from 'rxjs';
import { Cron, Interval } from '@nestjs/schedule';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Cron('45 * * * * *')
  // handleCron() {
  //   console.log('Called when the second is 45');
  // }

  // @Interval(10000)
  // handleInterval() {
  //   console.log('Called every 10 seconds');
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file.path.replace('static', 'public');
  }

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
