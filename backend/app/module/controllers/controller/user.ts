import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, HTTPQuery } from '@eggjs/tegg';
import { UserService } from '@/module/services';

@HTTPController({
  path: '/bar',
})
export class UserController {
  @Inject()
  UserService: UserService;

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: 'user',
  })
  async user(@HTTPQuery({ name: 'userId' }) userId: string) {
    console.log(userId)
    return await this.UserService.hello();
  }
}
