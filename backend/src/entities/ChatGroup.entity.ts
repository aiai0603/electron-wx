import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("chat_group", { schema: "chat" })
export class ChatGroup {
  @PrimaryGeneratedColumn({ type: "int", name: "group_id" })
  groupId: number;

  @Column("varchar", { name: "group_name", length: 255 })
  groupName: string;

  @Column("text", { name: "group_notice" })
  groupNotice: string;

  @Column("tinyint", { name: "group_level" })
  groupLevel: number;

  @Column("int", { name: "group_create_id" })
  groupCreateId: number;

  @Column("datetime", { name: "create_time" })
  createTime: Date;

  @Column("tinyint", { name: "delete_flag" })
  deleteFlag: number;
}
