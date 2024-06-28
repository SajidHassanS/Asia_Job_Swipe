"use client";
import React, { useState } from 'react';
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
import { FaRegBellSlash } from "react-icons/fa6";

const Notification = () => {
  const [messages, setMessages] = useState([
    { id: 1, name: 'Jan Mayer', time: '12 mins ago', text: 'We want to invite you for a qui...', avatar: '/images/messages/4.png', details: "Here are the details of the notification." },
    { id: 2, name: 'Joe Bartmann', time: '3:40 PM', text: 'Hey thanks for your interview...', avatar: '/images/messages/2.png', details: "Here are the details of the notification." },
    // Add more messages here
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [isProfilePicDialogOpen, setIsProfilePicDialogOpen] = useState(false);

  const handleSelectMessage = (id: number) => {
    setSelectedMessage(id);
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
            placeholder="Search notifications"
            className="w-full text-signininput3 rounded border p-2 pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul className="overflow-y-auto h-[calc(100vh-60px)]">
          {filteredMessages.map((message) => (
            <li
              key={message.id}
              className={`mb-4 pb-4 border-b flex items-center cursor-pointer ${selectedMessage === message.id ? 'bg-gray-200' : ''}`}
              onClick={() => handleSelectMessage(message.id)}
            >
              <img src={message.avatar} alt="avatar" className="mr-2 h-10 w-10 rounded-full cursor-pointer" onClick={() => setIsProfilePicDialogOpen(true)} />
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
              <Dialog open={isProfilePicDialogOpen} onOpenChange={setIsProfilePicDialogOpen}>
                <DialogTrigger asChild>
                  <div></div>
                </DialogTrigger>
                <DialogContent className="p-6">
                  <img
                    src={message.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </DialogContent>
              </Dialog>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden md:flex md:w-2/3 flex-col h-full">
        {selectedMessage !== null ? (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-4">
                <Dialog open={isProfilePicDialogOpen} onOpenChange={setIsProfilePicDialogOpen}>
                  <DialogTrigger asChild>
                    <img
                      src={messages.find((message) => message.id === selectedMessage)?.avatar}
                      alt="avatar"
                      className="h-10 w-10 rounded-full cursor-pointer"
                      onClick={() => setIsProfilePicDialogOpen(true)}
                    />
                  </DialogTrigger>
                  <DialogContent className="p-6">
                    <img
                      src={messages.find((message) => message.id === selectedMessage)?.avatar}
                      alt="avatar"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
                <p className="font-semibold text-lg">{messages.find((message) => message.id === selectedMessage)?.name}</p>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <p className="text-base text-gray-500">{messages.find((message) => message.id === selectedMessage)?.details}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <FaRegBellSlash className='text-signature opacity-40' size={200} />
            <p className="text-lg text-signature opacity-70">No Notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
