import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatFriend } from 'src/entities/ChatFriend.entity';
import { ChatFriendTag } from 'src/entities/ChatFriendTag.entity';
import { ChatUser } from 'src/entities/ChatUser.entity';
import { CreateFriendDto } from 'src/user/dto/create-friend.dto';
import { Repository } from 'typeorm';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(ChatFriend)
    private friendRepository: Repository<ChatFriend>,
  ) {}

  refuseOne(id: number) {
    return this.friendRepository
      .createQueryBuilder()
      .update(ChatFriend)
      .set({ friendState: 2 })
      .where('friend_id = :id', { id: id })
      .execute();
  }

  createFriend(createFriendDto: CreateFriendDto) {
    let createUser = {
      ...createFriendDto,
      deleteFlag: 0,
      friendState: 0,
      sendTime: new Date(),
    };

    return this.friendRepository.save(createUser);
  }

  agreeFriend(createFriendDto: CreateFriendDto) {
    let createUser = {
      ...createFriendDto,
      deleteFlag: 0,
      friendState: 1,
      sendTime: new Date(),
    };

    this.friendRepository
      .createQueryBuilder()
      .update(ChatFriend)
      .set({ friendState: 1 })
      .where(
        'friend_from_id = :id and friend_to_id = :id2 and friend_state = 0',
        {
          id: createFriendDto.friendToId,
          id2: createFriendDto.friendFromId,
        },
      )
      .execute();

    return this.friendRepository.save(createUser);
  }

  findAll(id: number): Promise<any> {
    return this.friendRepository
      .createQueryBuilder()
      .leftJoinAndSelect(
        ChatUser,
        'user',
        'ChatFriend.friend_from_id = user.user_id',
      )
      .select(
        `
            ChatFriend.friend_id as id,
            user.user_id as friend,
            ChatFriend.friend_name as name,
            user.user_nick_name as nickName,
            user.user_avater as avatar
          `,
      )
      .where('ChatFriend.friend_to_id = :id and ChatFriend.friend_state = 1', {
        id: id,
      })
      .orderBy('name', 'DESC')
      .getRawMany();
  }

  getOne(id: number): Promise<any> {
    return this.friendRepository
      .createQueryBuilder()
      .leftJoinAndSelect(
        ChatUser,
        'user',
        'ChatFriend.friend_from_id = user.user_id',
      )
      .leftJoinAndSelect(ChatFriendTag, 'tag', 'ChatFriend.tag_id = tag.tag_id')
      .select(
        `
          user.user_id as id,
          user.user_nick_name as nickName,
          user.user_name as name,
          user.user_avater as avatar,
          user.user_sign as sign,
          user.user_sex as sex,
          user.user_local as local,
          tag.tag_name as tag,
          ChatFriend.friend_name as friendName,
          ChatFriend.friend_from as fromState`,
      )
      .where('ChatFriend.friend_id = :id and ChatFriend.friend_state = 1', {
        id: id,
      })
      .getRawMany();
  }

  canAdd(id: number, fid: number): Promise<any> {
    return this.friendRepository
      .createQueryBuilder()
      .where(
        'friend_from_id = :id and friend_to_id = :id2 and ( friend_state = 0 or friend_state = 1 )',
        {
          id: id,
          id2: fid,
        },
      )
      .getCount();
  }

  findAllApply(id: number) {
    return this.friendRepository
      .createQueryBuilder()
      .leftJoinAndSelect(
        ChatUser,
        'user',
        'ChatFriend.friend_from_id = user.user_id',
      )
      .select(
        `
            ChatFriend.friend_id as id,
            user.user_id as friend,
            user.user_nick_name as nickName,
            user.user_name as name,
            user.user_avater as avatar,
            user.user_sign as sign,
            user.user_sex as sex,
            user.user_local as local,
            ChatFriend.friend_state as state,
            ChatFriend.friend_msg as msg,
            ChatFriend.send_time as time
          `,
      )
      .where('ChatFriend.friend_to_id = :id', {
        id: id,
      })
      .orderBy('time', 'DESC')
      .getRawMany();
  }
}
