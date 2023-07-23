import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  AuthService: any;
  constructor(private readonly authService: AuthService) {}
  //使用jwt验证token的端口
  @UseGuards(AuthGuard('jwt'))
  @Post('tokenIn')
  aPost(@Req() req) {
    return req.user;
  }
  @Post('getToken')
  getTokenByUserId(@Body() user: any) {
    return this.authService.createToken(user);
  }
}
