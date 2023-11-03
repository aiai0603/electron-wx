import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
  ForbiddenException,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserException } from 'common/UserException';
import { PasswordInterceptor } from 'common/password.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if ((await this.userService.findByName(createUserDto.userNickName)) > 0) {
      throw new UserException(10001, '用户名重复');
    }

    let re = await this.userService.create(createUserDto);

    return re.userId;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let re = await this.userService.findOne(+id);
    if (re == null) {
      throw new UserException(10404, '找不到用户');
    }
    return re;
  }


  @Get('addfriend/:id')
  @UseInterceptors(PasswordInterceptor)
  async find(@Param('id') key: string) {
    let re = await this.userService.findByNameOrPhone(key);
    return re;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
