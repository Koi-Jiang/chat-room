import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import Login from './pages/Login.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ChatRoom from './pages/ChatRoom.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/chatroom",
    element: <ChatRoom />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
