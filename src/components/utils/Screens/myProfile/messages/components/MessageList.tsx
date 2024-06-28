"use client";
import React, { useState } from 'react';
import { TbMessage2Off } from "react-icons/tb";
import { IoVideocamOutline, IoCallOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import Image from 'next/image';
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

const MessageList = () => {
  const [messages, setMessages] = useState([
    { id: 1, name: 'Jan Mayer', time: '12 mins ago', text: 'We want to invite you for a qui...', avatar: '/images/messages/4.png', chat: ['Hello!', 'How are you?'] },
    { id: 2, name: 'Joe Bartmann', time: '3:40 PM', text: 'Hey thanks for your interview...', avatar: '/images/messages/2.png', chat: ['Hey!', 'Thanks for the interview.'] },
    // Add more messages here
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [isVideoCallDialogOpen, setIsVideoCallDialogOpen] = useState(false);
  const [isProfilePicDialogOpen, setIsProfilePicDialogOpen] = useState(false);

  const handleSelectChat = (id: number) => {
    setSelectedChat(id);
  };

  const handleSendMessage = () => {
    if (selectedChat !== null && newMessage.trim() !== '') {
      const updatedMessages = messages.map((message) => {
        if (message.id === selectedChat) {
          return { ...message, chat: [...message.chat, newMessage] };
        }
        return message;
      });
      setMessages(updatedMessages);
      setNewMessage('');
    }
  };

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.text.toLowerCase().includes(searchTerm.toLowerCase())
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
          {filteredMessages.map((message) => (
            <li key={message.id} className="mb-4 pb-4 border-b flex items-center cursor-pointer" onClick={() => handleSelectChat(message.id)}>
              <img src={message.avatar} alt="avatar" className="mr-2 h-10 w-10 rounded-full" />
              <div>
                <div className='flex justify-between'>
                  <div className='flex items-center'>
                    <p className="font-semibold text-base">{message.name}</p>
                    <BsDot color='blue' />
                  </div>
                  <div>
                    <span className=" text-sm text-gray-500">{message.time}</span>
                  </div>
                </div>
                <p className="text-base text-gray-500">{message.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden md:flex md:w-2/3 flex-col">
        {selectedChat !== null ? (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-4">
                <Dialog open={isProfilePicDialogOpen} onOpenChange={setIsProfilePicDialogOpen}>
                  <DialogTrigger asChild>
                    <img
                      src={messages.find((message) => message.id === selectedChat)?.avatar}
                      alt="avatar"
                      className="h-10 w-10 rounded-full cursor-pointer"
                      onClick={() => setIsProfilePicDialogOpen(true)}
                    />
                  </DialogTrigger>
                  <DialogContent className="p-6">
                    <img
                      src={messages.find((message) => message.id === selectedChat)?.avatar}
                      alt="avatar"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
                <p className="font-semibold text-lg">{messages.find((message) => message.id === selectedChat)?.name}</p>
              </div>
              <div className="flex gap-4">
                <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" onClick={() => setIsCallDialogOpen(true)}><IoCallOutline size={25} /></Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[400px] p-6">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold">Call</DialogTitle>
                      <DialogDescription className="text-md text-gray-500">
                        You are about to start a voice call with {messages.find((message) => message.id === selectedChat)?.name}.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-4">
                      <Button variant="outline" onClick={() => setIsCallDialogOpen(false)}>Cancel</Button>
                      <Button  onClick={() => alert("Starting call...")}>Start Call</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog open={isVideoCallDialogOpen} onOpenChange={setIsVideoCallDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" onClick={() => setIsVideoCallDialogOpen(true)}><IoVideocamOutline size={25} /></Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[400px] p-6">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold">Video Call</DialogTitle>
                      <DialogDescription className="text-md text-gray-500">
                        You are about to start a video call with {messages.find((message) => message.id === selectedChat)?.name}.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-4">
                      <Button variant="outline" onClick={() => setIsVideoCallDialogOpen(false)}>Cancel</Button>
                      <Button onClick={() => alert("Starting video call...")}>Start Video Call</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <div className="flex flex-col gap-2">
                {messages.find((message) => message.id === selectedChat)?.chat.map((text, index) => (
                  <div key={index} className="p-2 bg-bglite rounded-md self-start max-w-[70%]">{text}</div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t flex gap-4">
              <input
                type="text"
                className="flex-1 border rounded p-2"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <TbMessage2Off className=' text-signature opacity-40' size={200} />
            <p className="text-lg text-signature opacity-70">No Messages</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;
