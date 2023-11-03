import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FriendService } from './friend.service';
import { CreateFriendDto } from 'src/user/dto/create-friend.dto';
import { UserException } from 'common/UserException';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get('/apply/:id')
  findAllApply(@Param('id') id: number) {
    return this.friendService.findAllApply(id);
  }

  @Get('/:id')
  findAll(@Param('id') id: number) {
    return this.friendService.findAll(id);
  }

  @Get('/user/:id')
  getOne(@Param('id') id: number) {
    return this.friendService.getOne(id);
  }

  @Get('/refuse/:id')
  refuseOne(@Param('id') id: number) {
    return this.friendService.refuseOne(id);
  }

  @Post('/add')
  async addriend(@Body() createFriendDto: CreateFriendDto) {
    if (createFriendDto.mode == 'add') {
      delete createFriendDto.mode;
      if (
        (await this.friendService.canAdd(
          createFriendDto.friendFromId,
          createFriendDto.friendToId,
        )) != 0 ||
        (await this.friendService.canAdd(
          createFriendDto.friendToId,
          createFriendDto.friendFromId,
        )) != 0
      ) {
        throw new UserException(10002, '已经是好友或者已经提出申请了');
      }
      return this.friendService.createFriend(createFriendDto);
    } else {
      delete createFriendDto.mode;
      return this.friendService.agreeFriend(createFriendDto);
    }
  }
}
