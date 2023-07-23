import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("chat_friend", { schema: "chat" })
export class ChatFriend {
  @PrimaryGeneratedColumn({ type: "int", name: "friend_id" })
  friendId: number;

  @Column("int", { name: "tag_id" })
  tagId: number;

  @Column("int", { name: "friend_from_id" })
  friendFromId: number;

  @Column("int", { name: "friend_to_id" })
  friendToId: number;

  @Column("tinyint", { name: "friend_chat_flag" })
  friendChatFlag: number;

  @Column("tinyint", { name: "friend_visit_flag" })
  friendVisitFlag: number;

  @Column("varchar", { name: "friend_name", length: 255 })
  friendName: string;

  @Column("tinyint", { name: "frined_from" })
  frinedFrom: number;

  @Column("datetime", { name: "send_time" })
  sendTime: Date;

  @Column("tinyint", { name: "delete_flag" })
  deleteFlag: number;
}
