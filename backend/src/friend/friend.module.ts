import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatFriend } from 'src/entities/ChatFriend.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ChatFriend])],
  controllers: [FriendController],
  providers: [FriendService]
})
export class FriendModule {

}
