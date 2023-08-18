import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserException } from 'common/UserException';
import { ChatUser } from 'src/entities/ChatUser.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(ChatUser) private userRepository: Repository<ChatUser>,
  ) {}

  async createToken(user: { name: any; password: any }) {
    const payload = { username: user.name, password: user.password };
    const data = await this.userRepository.findOne({
      where: {
        userName: user.name,
        userPassword: user.password,
      },
    });

    if (!data) {
      throw new UserException(10001, '账号或者密码错误');
    } else {
      delete data.userPassword;
      return {
        msg: '登录成功',
        data: {
          user: data,
          token: this.jwtService.sign(payload),
        },
      };
    }
  }
}
