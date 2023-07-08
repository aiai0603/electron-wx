import { EggLogger } from "egg";
import { SingletonProto, AccessLevel, Inject } from "@eggjs/tegg";

@SingletonProto({
  // 如果需要在上层使用，需要把 accessLevel 显示声明为 public
  accessLevel: AccessLevel.PUBLIC,
})
export class UserService {
  // 注入一个 logger
  @Inject()
  logger: EggLogger;

  @Inject()
  mysql;

  // 封装业务
  async hello(): Promise<any> {
    const res = await this.mysql.select("chat_user");
    return { res };
  }
}
