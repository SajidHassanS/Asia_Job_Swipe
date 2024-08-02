"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { receiveMessage } from "@/store/slices/messageSlice";
import socket from "@/utils/constants";

const MessageListener = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        const userInfo = JSON.parse(storedUserInfo);
        setUserId(userInfo._id);
      }
    }
  }, []);

  useEffect(() => {
    if (socket) {
      const handleMessage = (message: any) => {
        if (message.receiver === userId || message.sender === userId) {
          console.log("Received new message:", message);
          dispatch(receiveMessage(message));
        }
      };

      const handleOnlineUsers = (users: string[]) => {
        setOnlineUsers(users);
        console.log("Online users:", users);
      };

      socket.on("newMessage", handleMessage);
      socket.on("getOnlineUsers", handleOnlineUsers);

      // Cleanup listeners on component unmount
      return () => {
        socket?.off("newMessage", handleMessage);
        socket?.off("getOnlineUsers", handleOnlineUsers);
      };
    }
  }, [dispatch, userId]);

  return null;
};

export default MessageListener;
