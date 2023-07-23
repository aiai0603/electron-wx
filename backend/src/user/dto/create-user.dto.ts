import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: '用户名不为空' })
  readonly userName: string;

  @ApiProperty()
  @IsNotEmpty({ message: '昵称不为空' })
  readonly userNickName: string;
 
  @ApiProperty()
  @IsNotEmpty({ message: '密码不为空' })
  readonly userPassword: string;
 
  @ApiProperty()
  @IsNotEmpty({ message: '手机号不为空' })
  readonly userPhone: string;
 
  @ApiProperty()
  @IsNotEmpty({ message: '头像不为空' })
  readonly userAvater: string;
 
  @ApiProperty()
  @IsNotEmpty({ message: '性别不为空' })
  readonly userSex: number;

  @ApiProperty()
  @IsNotEmpty({ message: '所在地不为空' })
  readonly userLocal: string;

}