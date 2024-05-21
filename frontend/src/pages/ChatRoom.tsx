import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageResponse,
  WebSocketRequest,
  WebSocketResponse,
} from "shared/dist/models";

function ChatRoom() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const userName = useRef<string | null>(null);
  const socket = useRef<WebSocket | null>(null);
  const [currentCount, setCurrentCount] = useState<number>(1);

  const [text, setText] = useState<string>("");
  const chatBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    userName.current = localStorage.getItem("userName");
    if (!userName.current) {
      navigate("/");
      return;
    }
    
    socket.current = new WebSocket("ws://localhost:8080");
    socket.current.addEventListener("open", () => {
      const data: WebSocketRequest = {
        type: "login",
        payload: { userName: userName.current ?? "bye" },
      };
      socket.current!.send(JSON.stringify(data));
    });

    socket.current.addEventListener("message", (e) => {
      handleResponseMessage(e.data);
    });

    return () => {
      socket.current?.close();
    };
  }, []);

  function handleResponseMessage(message: string) {
    const input = JSON.parse(message) as WebSocketResponse;
    switch (input.type) {
      case "login": {
        setCurrentCount(input.payload.currentCount);
        break;
      }
      case "logout": {
        setCurrentCount(input.payload.currentCount);
        break;
      }
      case "message": {
        const newMessage = input.payload.text.trim();
        if(newMessage === "") return;
        setMessages((messages) => [...messages, input.payload]);
        break;
      }
    }
  }

  // handle text send
  function handleSendText() {
    const data: WebSocketRequest = { type: "message", payload: { text } };
    socket.current?.send(JSON.stringify(data));
    setText("");
  }
  function handleInputKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSendText();
  }

  // control the chatBox auto scroll to buttom after receive new message
  useEffect(() => {
    chatBox.current!.scrollTop = chatBox.current!.scrollHeight;
  }, [messages]);

  function handleLogout() {
    userName.current = null;
    localStorage.removeItem("userName");
    navigate("/");
  }

  return (
    <div className="flex justify-center h-screen p-12">
      <div className="card bg-neutral shadow-xl w-[30rem]">
        <div className="card-body overflow-hidden">
          <div className="flex justify-between">
            <h2 className="card-title">Chat Room</h2>
            <button className="btn btn-ghost hover:bg-red-400 text-red-600 hover:text-white" onClick={handleLogout}>Logout</button>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs rounded-full w-[0.6rem] h-[0.6rem] bg-success"></span>
            {currentCount} online
          </div>
          <div className="overflow-y-auto h-full" ref={chatBox}>
            {messages.map((message, i) => {
              if (message.isSystemMessage) {
                return (
                  <div className="rounded-full bg-base-200 w-fit py-1 px-4 m-auto mt-1">
                    {message.fromUser} {message.text}
                  </div>
                );
              }
              if (message.fromUser === userName.current) {
                return (
                  <div className="chat chat-end" key={i}>
                    <div className="chat-header">{message.fromUser}</div>
                    <div className="chat-bubble chat-bubble-info">
                      {message.text}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="chat chat-start" key={i}>
                    <div className="chat-header">{message.fromUser}</div>
                    <div className="chat-bubble chat-bubble-primary">
                      {message.text}
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="card-actions justify-between flex-nowrap">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type here"
              className="input input-bordered input-md w-full"
              onKeyDown={handleInputKeyPress}
            />
            <button
              className="btn btn-ghost btn-success btn-square"
              onClick={handleSendText}
            >
              <span className="material-symbols-outlined text-4xl text-primary">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatRoom;
