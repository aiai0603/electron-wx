// socket-io.module.ts

import { Module } from '@nestjs/common';
import { SocketIoGateway } from './socket.gateway';

@Module({
  providers: [SocketIoGateway],
})
export class SocketModule {}