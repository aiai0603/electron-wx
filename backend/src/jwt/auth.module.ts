import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtKey } from './key';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatUser } from 'src/entities/ChatUser.entity';

@Module({
  imports: [
    JwtModule.register({
      //生成token的key
      secret: jwtKey.secret,
      // signOption可以在JwtModule设定
      // 或是在createToken时候设定
      signOptions: {
        //token的有效时长
        expiresIn: jwtKey.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([ChatUser]),
  ],
  providers: [AuthService, AuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
