import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorsInterceptor } from 'common/errors.interceptor';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './jwt/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ResponseInterceptor } from 'common/respone.interceptor';
import { HttpExceptionFilter } from 'common/userException.filter';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: '47.97.158.11', // 域名
      port: 3306, // 端口
      username: 'root', // 数据库名字
      password: 'Sss991126/', // 数据库密码
      database: 'chat', // 库名
      entities: ['dist/src/entities/**.entity{.ts,.js}'], // 导入的实体(数据库模型)
      synchronize: false,
      retryAttempts: 2,
      retryDelay: 2000,
      autoLoadEntities: false,
    }),
    UserModule,
    AuthModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    }
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    ,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    AppService,
  ], // 当前模块的提供者集合
})
export class AppModule {}
