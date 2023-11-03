import React from "react";
import { createContext, ReactNode, useContext } from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_URL = "ws://localhost:4000";

const SocketContext = createContext<any>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  let [connect, setConnect] = React.useState<any>(false);
  let [socket, setSocket] = React.useState<Socket | null>(null);

  const connectSocket = (id: string) => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: false,
      query: {
        id: id,
      },
    });
    socket?.connect();

    socket?.on("connect", () => {
      console.log("连接成功");
      setConnect(true);
    });

    socket?.on("disconnect", () => {
      console.log("已断开与服务器的连接");
      setConnect(false);
    });

    socket?.on("reconnect_attempt", (attemptNumber) => {
      console.log(`正在尝试第${attemptNumber}次重连...`);
    });

    socket?.on("reconnect", (attemptNumber) => {
      console.log(`已重连至服务器，一共尝试了${attemptNumber}次`);
    });

    setSocket(socket);
  };

  const disconnectSocket = () => {
    socket?.disconnect();
    setSocket(null);
  };

  let value = {
    connect,
    socket,
    connectSocket,
    disconnectSocket,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  return context;
};

const AppContextProviders = ({ children }: { children: ReactNode }) => (
  <SocketProvider>{children}</SocketProvider>
);

export default AppContextProviders;
