// socket-io.gateway.ts

import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(4000, {
  transports: ['websocket'],
})
export class SocketIoGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  users: any = {};

  handleConnection(client: Socket) {
    let id = client.handshake.query.id as string;
    this.users[id] = client.id;
  }

  handleDisconnect(client: Socket) {
    let id = client.handshake.query.id as string;
    delete this.users[id];
  }

  @SubscribeMessage('socketTest')
  socketTest(@MessageBody() data: any) {
    let to = data.to;

    //console.log(data)
    //console.log(this.users)
    if (this.users[to]) {
      this.server.to(this.users[to]).emit('socketTest2', data);
    }
  }
}
