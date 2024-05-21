import { LoginResponse } from "./LoginResponse";
import { LogoutResponse } from "./LogoutResponse";
import { MessageResponse } from "./MessageResponse";

type GenericWebSocketResponse<T, P> = { type: T, payload: P };

export type WebSocketResponse =
  | GenericWebSocketResponse<"login", LoginResponse> 
  | GenericWebSocketResponse<"logout", LogoutResponse> 
  | GenericWebSocketResponse<"message", MessageResponse> 
