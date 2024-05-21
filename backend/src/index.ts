import {
  LoginResponse,
  LogoutResponse,
  MessageResponse,
  WebSocketRequest,
  WebSocketResponse,
} from "shared/dist/models";
import WebSocket from "ws";

const server = new WebSocket.Server({ port: 8080 });

class MyWebSocket extends WebSocket {
  userName?: string;
}

const sockets = new Set<MyWebSocket>();

server.on("connection", (socket: MyWebSocket) => {
  sockets.add(socket);
  socket.on("message", (message) => {
    handleMessage(socket, message.toString());
  });
  socket.on("close", (e) => {
    sockets.delete(socket);
    if (!socket.userName) return;
    const payload: LogoutResponse = {
      userName: socket.userName,
      currentCount: sockets.size,
    };
    broadcast({ type: "logout", payload });
    const systemMesg: MessageResponse = {
      fromUser: socket.userName,
      isSystemMessage: true,
      text: "left the room",
    };
    broadcast({ type: "message", payload: systemMesg });
  });
});

function broadcast(response: WebSocketResponse) {
  const data = JSON.stringify(response);
  for (const socket of sockets) {
    socket.send(data);
  }
}

function handleMessage(socket: MyWebSocket, message: string) {
  const input = JSON.parse(message) as WebSocketRequest;
  switch (input.type) {
    case "login": {
      socket.userName = input.payload.userName;
      const payload: LoginResponse = {
        userName: socket.userName,
        currentCount: sockets.size,
      };
      broadcast({ type: "login", payload });
      const systemMesg: MessageResponse = {
        fromUser: socket.userName,
        isSystemMessage: true,
        text: "joined the room",
      };
      broadcast({ type: "message", payload: systemMesg });
      break;
    }
    case "message": {
      const payload: MessageResponse = {
        fromUser: socket.userName ?? "Unknown User",
        text: input.payload.text,
      };
      broadcast({ type: "message", payload });
      break;
    }
  }
}
