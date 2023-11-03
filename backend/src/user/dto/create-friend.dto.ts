import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateFriendDto {

  @ApiProperty()
  @IsNotEmpty({ message: '用户名不为空' })
  readonly friendFromId: number;

  @ApiProperty()
  @IsNotEmpty({ message: '用户名2不为空' })
  readonly friendToId: number;

  @ApiProperty()
  @IsNotEmpty({ message: '申请信息不为空' })
  readonly friendMsg: string;
 
  @ApiProperty()
  readonly friendName: string;
 
  @ApiProperty()
  @IsNotEmpty({ message: '标签不为空' })
  readonly tagId: number;
 
  @ApiProperty()
  @IsNotEmpty({ message: '标志1不为空' })
  readonly friendChatFlag: number;
 
  @ApiProperty()
  @IsNotEmpty({ message: '标志2不为空' })
  readonly friendVisitFlag: number;

  @ApiProperty()
  @IsNotEmpty({ message: '来源不为空' })
  readonly friendFrom: number;

  @IsNotEmpty({ message: '种类为空' })
  mode: string;



}