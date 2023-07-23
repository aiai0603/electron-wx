import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("chat_friend_tag", { schema: "chat" })
export class ChatFriendTag {
  @PrimaryGeneratedColumn({ type: "int", name: "tag_id" })
  tagId: number;

  @Column("varchar", { name: "tag_name", length: 255 })
  tagName: string;

  @Column("int", { name: "tag_user" })
  tagUser: number;

  @Column("tinyint", { name: "delete_flag" })
  deleteFlag: number;

  @Column("datetime", { name: "create_time" })
  createTime: Date;
}
