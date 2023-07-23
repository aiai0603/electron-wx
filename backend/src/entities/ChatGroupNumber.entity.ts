import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("chat_group_number", { schema: "chat" })
export class ChatGroupNumber {
  @PrimaryGeneratedColumn({ type: "int", name: "group_number_id" })
  groupNumberId: number;

  @Column("int", { name: "group_id" })
  groupId: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("varchar", { name: "group_personal_name", length: 255 })
  groupPersonalName: string;

  @Column("varchar", { name: "group_nick_name", length: 255 })
  groupNickName: string;

  @Column("tinyint", { name: "group_set_top" })
  groupSetTop: number;

  @Column("tinyint", { name: "group_set_notice" })
  groupSetNotice: number;

  @Column("tinyint", { name: "group_number_level" })
  groupNumberLevel: number;

  @Column("datetime", { name: "join_time" })
  joinTime: Date;

  @Column("tinyint", { name: "delete_flag" })
  deleteFlag: number;
}
