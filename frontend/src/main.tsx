import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import Login from "./pages/Login.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatRoom from "./pages/ChatRoom.tsx";
import SignUp from "./pages/SignUp.tsx";
import FindPassword from "./pages/FindPassword.tsx";
import GlobalContextProvider from "./contexts/GlobalContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/chatroom",
    element: <ChatRoom />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/findPassword",
    element: <FindPassword />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  </React.StrictMode>
);
