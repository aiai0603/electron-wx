import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("chat_user", { schema: "chat" })
export class ChatUser {

  @PrimaryGeneratedColumn({ type: "int", name: "user_id" })
  userId: number;

  @Column("varchar", { name: "user_nick_name", length: 255 })
  userNickName: string;

  @Column("tinyint", { name: "user_sex" })
  userSex: number;

  @Column("varchar", { name: "user_password", length: 255 })
  userPassword: string;

  @Column("varchar", { name: "user_name", length: 255 })
  userName: string;

  @Column("varchar", { name: "user_phone", length: 255 })
  userPhone: string;

  @Column("varchar", { name: "user_local", length: 255 })
  userLocal: string;

  @Column("varchar", { name: "user_avater", length: 10000 })
  userAvater: string;

  @Column("tinyint", { name: "delete_flag" })
  deleteFlag: number;

  @Column("tinyint", { name: "user_online" })
  userOnline: number;

  @Column("varchar", { name: "user_level", length: 255 })
  userLevel: string;

  @Column("varchar", { name: "user_sign", length: 255 })
  userSign: string;

  @Column("datetime", { name: "sign_time" })
  signTime: Date;
}
