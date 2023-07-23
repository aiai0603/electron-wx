import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
      ) {}

  async createToken(user: { name: any; password: any; }) {
    const payload = { username: user.name, password: user.password };
    //在实际项目中一般要进行数据库验证查看用户用户名密码是否正确
    //const data = await this.userRepository.findOne({username:user.username, password: user.password})
    //if(!data) {
    // return {code: 1 , msg:'登录失败', data: ''}
    //}
    delete user.password;
    return {
      msg: '登录成功',
      data: {
        user: user,
        //得到token
        token: this.jwtService.sign(payload),
      },
    };
  }
}
