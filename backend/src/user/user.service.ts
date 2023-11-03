import { Injectable, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatUser } from 'src/entities/ChatUser.entity';
import { Repository } from 'typeorm';
import { ChatFriend } from 'src/entities/ChatFriend.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(ChatUser) private userRepository: Repository<ChatUser>,
  ) {}

  create(CreateUserDto: CreateUserDto) {
    let createUser = {
      ...CreateUserDto,
      deleteFlag: 0,
      userOnline: 0,
      userLevel: '0',
      userSign: '',
      signTime: new Date(),
    };

    return this.userRepository.save(createUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findByName(name: string) {
    let qb = this.userRepository.createQueryBuilder();
    return qb.where('user_name = :name', { name: name }).getCount();
  }

  findByNameOrPhone(key: string) {
    return this.userRepository.find({
      where: [{ userName: key }, { userPhone: key }],
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        userId: id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
