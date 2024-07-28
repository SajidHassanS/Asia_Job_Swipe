"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store"; // Adjust the path as necessary
import {
  fetchChats,
  fetchMessages,
  sendMessage,
  receiveMessage,
} from "@/store/slices/messageSlice"; // Adjust the path as necessary
import socket from "@/services/socket";
import { TbMessage2Off } from "react-icons/tb";
import { IoVideocamOutline, IoCallOutline, IoSearch } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";

// Define types
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  companyLogo?: string;
}

interface Message {
  _id: string;
  sender: User;
  receiver: User;
  message: string;
  createdAt: string; // or Date if you prefer to use Date objects
}

const MessageList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { chats, messages, status, error } = useSelector(
    (state: RootState) => state.messageSlice
  ); // Correct slice name
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [isVideoCallDialogOpen, setIsVideoCallDialogOpen] = useState(false);
  const [isProfilePicDialogOpen, setIsProfilePicDialogOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Fetch accessToken and userId from localStorage
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userId = userInfo._id;

  useEffect(() => {
    if (accessToken) {
      console.log("Dispatching fetchChats action");
      dispatch(fetchChats({ token: accessToken }));
    } else {
      console.error("Access token not found");
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (selectedChat && accessToken) {
      console.log("Dispatching fetchMessages action");
      dispatch(fetchMessages({ receiverId: selectedChat, token: accessToken }));
    } else if (!accessToken) {
      console.error("Access token not found");
    }
  }, [selectedChat, dispatch, accessToken]);

  useEffect(() => {
    socket.on("newMessage", (message: Message) => {
      console.log("Received new message:", message);
      dispatch(receiveMessage(message));
      scrollToBottom();
    });

    return () => {
      socket.off("newMessage");
    };
  }, [dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSelectChat = (id: string) => {
    console.log("Selected chat:", id);
    setSelectedChat(id);
  };

  const handleSendMessage = () => {
    if (selectedChat && newMessage.trim() !== "" && accessToken) {
      const messageToSend = {
        receiverId: selectedChat,
        message: newMessage,
        token: accessToken,
      };
      console.log("Sending message to:", messageToSend.receiverId);
      dispatch(sendMessage(messageToSend) as any)
        .unwrap()
        .then(() => {
          setNewMessage("");
          if (inputRef.current) {
            inputRef.current.focus();
          }
          scrollToBottom();
        })
        .catch((err: any) => {
          console.error("Error sending message:", err);
        });
    }
  };

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredChats = (chats || []).filter((chat) =>
    chat.users.some(
      (user) =>
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="md:flex border rounded-[20px] h-screen">
      <div className="md:w-1/3 border-r px-4 py-4 md:pl-16 md:pr-10">
        <div className="relative mb-4 w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <IoSearch size={25} className="text-signininput3" />
          </div>
          <input
            type="text"
            placeholder="Search messages"
            className="w-full text-signininput3 rounded border p-2 pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul className="overflow-y-auto h-[calc(100vh-60px)]">
          {status === "loading" ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-lg text-signature opacity-70">
                Loading Chats...
              </p>
            </div>
          ) : filteredChats.length > 0 ? (
            filteredChats.map((chat) => {
              const user = chat.users.find((user) => user._id !== userId);
              return (
                <li
                  key={chat._id}
                  className="mb-4 pb-4 border-b flex items-center cursor-pointer"
                  onClick={() => handleSelectChat(chat._id)}
                >
                  <img
                    src={user?.profilePicture || user?.companyLogo}
                    alt="avatar"
                    className="mr-2 h-10 w-10 rounded-full"
                  />
                  <div>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <p className="font-semibold text-base">
                          {user?.firstName || user?.companyName}{" "}
                          {user?.lastName}
                        </p>
                        <BsDot color="blue" />
                      </div>
                      <div>
                        <span className=" text-sm text-gray-500">
                          {new Date(
                            chat.latestMessage.createdAt
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-base text-gray-500">
                      {chat.latestMessage.message}
                    </p>
                  </div>
                </li>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <TbMessage2Off
                className=" text-signature opacity-40"
                size={200}
              />
              <p className="text-lg text-signature opacity-70">No Messages</p>
            </div>
          )}
        </ul>
      </div>
      <div className="hidden md:flex md:w-2/3 flex-col">
        {selectedChat !== null ? (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-4">
                <Dialog
                  open={isProfilePicDialogOpen}
                  onOpenChange={setIsProfilePicDialogOpen}
                >
                  <DialogTrigger asChild>
                    <img
                      src={
                        chats
                          .find((chat) => chat._id === selectedChat)
                          ?.users.find((user) => user._id !== userId)
                          ?.profilePicture ||
                        chats
                          .find((chat) => chat._id === selectedChat)
                          ?.users.find((user) => user._id !== userId)
                          ?.companyLogo
                      }
                      alt="avatar"
                      className="h-10 w-10 rounded-full cursor-pointer"
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Profile Picture</DialogTitle>
                      <DialogDescription>
                        <Image
                          src={
                            chats
                              .find((chat) => chat._id === selectedChat)
                              ?.users.find((user) => user._id !== userId)
                              ?.profilePicture ||
                            chats
                              .find((chat) => chat._id === selectedChat)
                              ?.users.find((user) => user._id !== userId)
                              ?.companyLogo || ""
                          }
                          alt="Profile Picture"
                          layout="fill"
                        />
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsProfilePicDialogOpen(false)}
                      >
                        Close
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <p className="font-semibold text-base">
                  {
                    chats.find((chat) => chat._id === selectedChat)
                      ?.users.find((user) => user._id !== userId)?.firstName ||
                    ""
                  }{" "}
                  {
                    chats.find((chat) => chat._id === selectedChat)
                      ?.users.find((user) => user._id !== userId)?.lastName ||
                    ""
                  }
                </p>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => setIsCallDialogOpen(true)}
                >
                  <IoCallOutline />
                </Button>
                <Dialog
                  open={isCallDialogOpen}
                  onOpenChange={setIsCallDialogOpen}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Call</DialogTitle>
                      <DialogDescription>
                        <p>Are you sure you want to make a call?</p>
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsCallDialogOpen(false)}
                      >
                        Close
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  onClick={() => setIsVideoCallDialogOpen(true)}
                >
                  <IoVideocamOutline />
                </Button>
                <Dialog
                  open={isVideoCallDialogOpen}
                  onOpenChange={setIsVideoCallDialogOpen}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Video Call</DialogTitle>
                      <DialogDescription>
                        <p>Are you sure you want to make a video call?</p>
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsVideoCallDialogOpen(false)}
                      >
                        Close
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {status === "loading" ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-lg text-signature opacity-70">
                    Loading Messages...
                  </p>
                </div>
              ) : messages.length > 0 ? (
                <ul>
                  {messages.map((msg) => (
                    <li
                      key={msg._id}
                      className={`${
                        msg.sender._id === userId
                          ? "text-right"
                          : "text-left"
                      } mb-4`}
                    >
                      <div
                        className={`p-3 rounded-lg ${
                          msg.sender._id === userId
                            ? "bg-blue  text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        <p>{msg.message}</p>
                        <span className="text-xs text-gray-500">
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </li>
                  ))}
                  <div ref={bottomRef} />
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <TbMessage2Off
                    className="text-signature opacity-40"
                    size={200}
                  />
                  <p className="text-lg text-signature opacity-70">
                    No Messages
                  </p>
                </div>
              )}
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Type a message"
                  className="w-full text-signininput3 rounded border p-2"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  ref={inputRef}
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-2 px-4 py-2 bg-blue  text-white rounded"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-signature opacity-70">
              Select a chat to view messages
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;
