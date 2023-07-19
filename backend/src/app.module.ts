import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorsInterceptor } from 'common/errors.interceptor';

import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [], 
  controllers: [AppController],
  providers: [
    {
        provide: APP_INTERCEPTOR,
        useClass: ErrorsInterceptor
    },
    AppService
],  // 当前模块的提供者集合
})
export class AppModule {}
