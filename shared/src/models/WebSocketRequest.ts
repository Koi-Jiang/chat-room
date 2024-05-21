import { LoginRequest } from "./LoginRequest";
import { MessageRequest } from "./MessageRequest";

type GenericWebSocketRequest<T, P> = { type: T, payload: P };

export type WebSocketRequest =
  | GenericWebSocketRequest<"login", LoginRequest> 
  | GenericWebSocketRequest<"message", MessageRequest>;
