"use client";
import { useState } from "react";
import { TbMessage2Off } from "react-icons/tb";
import { IoVideocamOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { FaSmile } from 'react-icons/fa';
import { FaPaperPlane } from "react-icons/fa6";
import { BiSolidRightArrow } from "react-icons/bi";
const MessageList = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Jan Mayer",
      time: "12 mins ago",
      text: "Recruiter at Nomad",
      avatar: "/images/messages/4.png",
    },
  ]);

  return (
    <div className=" h-screen relative">
      <div className="  ">
        <ul>
          {messages.map((message) => (
            <li key={message.id} className="mb-4   flex items-center">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={message.avatar}
                    alt="avatar"
                    className="mr-2 h-10 w-10 rounded-full"
                  />
                  <div>
                    <div className="flex justify-between">
                      <div className="">
                        <p className="font-semibold text-base">
                          {message.name}{" "}
                        </p>
                        <p className=" text-custom-gray-blue text-base">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div>
                    <IoVideocamOutline size={25} />
                  </div>
                  <div>
                    <BsThreeDotsVertical size={25} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <hr />
      </div>

      <div className="">
      <div className="flex text-custom-gray-blue absolute bottom-0 w-full items-center border rounded-lg p-2">
      <GrAttachment size={25} className="mr-2" />
      <input
        type="text"
        placeholder="Reply message"
        className="flex-grow p-2 text-custom-gray-blue border-none rounded-[20px] focus:outline-none"
      />
      <FaSmile size={25} className="ml-2 mr-2 text-custom-gray-blue cursor-pointer" />
      <button className="bg-signature text-background py-2 px-4 rounded-lg">
        <BiSolidRightArrow  size={20} />
      </button>
    </div>
      </div>
    </div>
  );
};

export default MessageList;
