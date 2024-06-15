"use client"
import { useState } from 'react';
import { IoVideocamOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import { FaRegBellSlash } from "react-icons/fa6";

const Notification = () => {
  const [messages, setMessages] = useState([
    { id: 1, name: 'Jan Mayer', time: '12 mins ago', text: 'We want to invite you for a qui...', avatar: '/images/messages/4.png' },
    { id: 2, name: 'Joe Bartmann', time: '3:40 PM', text: 'Hey thanks for your interview...', avatar: '/images/messages/2.png' },
    // Add more messages here
  ]);

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
      />
    </div>
        <ul>
          {messages.map((message) => (
            <li key={message.id} className="mb-4 pb-4 border-b flex items-center">
              <img src={message.avatar} alt="avatar" className="mr-2 h-10 w-10 rounded-full" />
              <div>
                <div className='flex justify-between'>

                <div className='flex items-center'>
                <p className="font-semibold text-base">{message.name}  </p>
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
      <div className="hidden  md:flex md:w-2/3 items-center justify-center p-4">
        <div className="text-center">
        <FaRegBellSlash   className=' text-blue opacity-40' size={200} />
          <p className="text-lg text-blue opacity-70">No Messages</p>

        </div>
      </div>
    </div>
  );
};

export default Notification;
  