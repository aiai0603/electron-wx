import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("chat_record", { schema: "chat" })
export class ChatRecord {
  @PrimaryGeneratedColumn({ type: "int", name: "record_id" })
  recordId: number;

  @Column("int", { name: "record_user_id" })
  recordUserId: number;

  @Column("tinyint", { name: "record_type" })
  recordType: number;

  @Column("tinyint", { name: "record_state" })
  recordState: number;

  @Column("int", { name: "record_from_user" })
  recordFromUser: number;

  @Column("int", { name: "record_to" })
  recordTo: number;

  @Column("tinyint", { name: "record_to_type" })
  recordToType: number;

  @Column("longtext", { name: "record_msg" })
  recordMsg: string;

  @Column("datetime", { name: "record_time" })
  recordTime: Date;

  @Column("tinyint", { name: "delete_flag" })
  deleteFlag: number;
}
