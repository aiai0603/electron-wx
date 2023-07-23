import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatUser } from 'src/entities/ChatUser.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ChatUser])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
