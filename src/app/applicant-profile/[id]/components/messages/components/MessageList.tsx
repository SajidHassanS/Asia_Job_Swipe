"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchJobApplicationDetail, fetchMessages, sendMessage } from "@/store/slices/messageSlice";
import { GrAttachment } from "react-icons/gr";
import { FaSmile } from "react-icons/fa";
import { BiSolidRightArrow } from "react-icons/bi";
import Image from "next/image";
import MessageListener from "@/services/MessageListener";
import axios from "axios";

interface Message {
  _id: string;
  sender: string;
  receiver: string;
  message: string;
  createdAt: string;
}

const MessageList = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { messages = [], jobApplication, status } = useSelector((state: RootState) => state.messageSlice);
  const [newMessage, setNewMessage] = useState("");
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const companyId = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (companyId) {
      axios
        .get(`https://ajs-server.hostdonor.com/api/v1/company/${companyId}`)
        .then((response) => {
          const companyData = response.data.company;
          setCompanyDetails(companyData);

          if (companyData.userInfo) {
            setUserInfo(companyData.userInfo);
          }
        })
        .catch((error) => {
          console.error("Error fetching company details:", error);
        });
    }
  }, [companyId]);

  useEffect(() => {
    if (companyId && token) {
      const applicationId = Array.isArray(params.id) ? params.id[0] : params.id;

      dispatch(fetchJobApplicationDetail({ applicationId, token }) as any)
        .unwrap()
        .then((response: any) => {
          const jobSeeker = response.jobApplication?.jobSeeker;

          if (jobSeeker) {
            dispatch(fetchMessages({ receiverId: jobSeeker.userInfo, token }) as any)
              .unwrap()
              .then((fetchedMessages: Message[]) => {
                scrollToBottom();
              })
              .catch((err: unknown) => {
                console.error("Error fetching messages:", err);
              });
          } else {
            console.error("JobSeeker not found in response.");
          }
        })
        .catch((err: unknown) => {
          console.error("Error fetching job application details:", err);
        });
    }
  }, [dispatch, params.id, token, companyId]);

  useEffect(() => {
    if (status === 'succeeded') {
      scrollToBottom();
    }
  }, [messages, status]);

  const handleSendMessage = () => {
    if (jobApplication && jobApplication.jobSeeker.userInfo && newMessage.trim() && token) {
      const messageToSend = {
        receiverId: jobApplication.jobSeeker.userInfo,
        message: newMessage,
        token,
      };

      dispatch(sendMessage(messageToSend) as any)
        .unwrap()
        .then(() => {
          setNewMessage("");
          if (inputRef.current) {
            inputRef.current.focus();
          }
          dispatch(fetchMessages({ receiverId: messageToSend.receiverId, token }) as any)
            .then((fetchedMessages: Message[]) => {
              scrollToBottom();
            });
        })
        .catch((err: unknown) => {
          console.error("Error sending message:", err);
        });
    } else {
      console.log("Message not sent due to missing data:", {
        jobApplication,
        jobSeekerId: jobApplication?.jobSeeker?.userInfo,
        newMessage,
        token,
      });
    }
  };

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isSentByLocalUser = (message: Message) => {
    return message.sender === userInfo?._id;
  };

  return (
    <div className="h-screen flex flex-col">
      <MessageListener />
      <div className="flex items-center p-4 bg-gray-100 border-b">
        {jobApplication ? (
          <>
            <Image
              src={jobApplication.jobSeeker.profilePicture || '/images/profilepics.png'}
              alt="Profile"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full mr-4"
              onError={(e) => (e.currentTarget.src = '/images/fallback.png')}
            />
            <div>
              <p className="font-semibold text-lg">{jobApplication.jobSeeker.firstName} {jobApplication.jobSeeker.lastName}</p>
              <p className="text-sm text-gray-500">Status: Online</p>
            </div>
          </>
        ) : (
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full mr-4 bg-gray-300"></div>
            <div>
              <p className="font-semibold text-lg">Loading...</p>
              <p className="text-sm text-gray-500">Please wait</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {status === 'loading' ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p>No messages to display.</p>
        ) : (
          <ul>
            {messages.map((message) => (
              <li key={message._id} className={`mb-4 flex ${isSentByLocalUser(message) ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-center ${isSentByLocalUser(message) ? 'flex-row-reverse' : ''}`}>
                  <Image
                    src={isSentByLocalUser(message) ? (companyDetails?.companyLogo || '/images/fallback.png') : (jobApplication?.jobSeeker.profilePicture || '/images/profilepics.png')}
                    alt="avatar"
                    width={40}
                    height={40}
                    className={`h-10 w-10 rounded-full ${isSentByLocalUser(message) ? 'ml-2' : 'mr-2'}`}
                    onError={(e) => (e.currentTarget.src = '/images/fallback.png')}
                  />
                  <div className={`p-2 rounded-lg ${isSentByLocalUser(message) ? 'bg-signature text-background' : 'bg-gray-200 text-black'}`}>
                    <p>{message.message}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex text-custom-gray-blue items-center border rounded-lg p-2">
          <GrAttachment size={25} className="mr-2" />
          <input
            type="text"
            placeholder="Reply message"
            className="flex-grow p-2 text-custom-gray-blue border-none rounded-[20px] focus:outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            ref={inputRef}
          />
          <FaSmile size={25} className="ml-2 mr-2 text-custom-gray-blue cursor-pointer" />
          <button className="bg-signature text-background py-2 px-4 rounded-lg" onClick={handleSendMessage}>
            <BiSolidRightArrow size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
