import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchJobApplicationDetail, fetchMessages, sendMessage } from "@/store/slices/messageSlice";
import { GrAttachment } from "react-icons/gr";
import { FaSmile } from "react-icons/fa";
import { BiSolidRightArrow } from "react-icons/bi";
import Image from "next/image";
import axios from 'axios';
import MessageListener from "@/services/MessageListener";

interface Message {
  _id: string;
  sender: string;
  receiver: string;
  message: string;
  timestamp: string;
}

const MessageList = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { messages = [], jobApplication } = useSelector((state: RootState) => state.messageSlice);
  const [newMessage, setNewMessage] = useState("");
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const companyId = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (companyId) {
      axios.get(`https://ajs-server.hostdonor.com/api/v1/company/${companyId}`)
        .then(response => {
          setCompanyDetails(response.data.company);
          console.log("Company Details:", response.data.company);
        })
        .catch(error => {
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
          const jobSeekerUserInfo = response.jobSeeker?.userInfo;
          if (jobSeekerUserInfo) {
            dispatch(fetchMessages({ receiverId: jobSeekerUserInfo, token }) as any)
              .unwrap()
              .then((fetchedMessages: Message[]) => {
                console.log('Fetched messages:', fetchedMessages);
                scrollToBottom();
              })
              .catch((err) => {
                console.error("Error fetching messages:", err);
              });
          } else {
            console.error("JobSeeker userInfo not found in response.");
          }
        })
        .catch((err) => {
          console.error("Error fetching job application details:", err);
        });
    }
  }, [dispatch, params.id, token, companyDetails]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (jobApplication && jobApplication.jobSeeker.userInfo && newMessage.trim() && token) {
      const messageToSend = {
        receiverId: jobApplication.jobSeeker.userInfo,
        message: newMessage,
        token,
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
        .catch((err) => {
          console.error("Error sending message:", err);
        });
    }
  };

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isMessageForCurrentChat = (message: Message) => {
    if (!jobApplication || !companyDetails) return false;
    const { userInfo } = jobApplication.jobSeeker;
    return (
      (message.sender === userInfo && message.receiver === companyDetails?.userInfo?._id) ||
      (message.sender === companyDetails?.userInfo?._id && message.receiver === userInfo)
    );
  };

  const filteredMessages = messages.filter(isMessageForCurrentChat);

  return (
    <div className="h-screen flex flex-col">
      {/* Including the MessageListener component */}
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
              onError={(e) => e.currentTarget.src = '/images/fallback.png'}
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
        <ul>
          {companyDetails && filteredMessages.map((message) => (
            <li key={message._id} className={`mb-4 flex ${message.sender === companyDetails.userInfo._id ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-center ${message.sender === companyDetails.userInfo._id ? 'flex-row-reverse' : ''}`}>
                <Image
                  src={message.sender === companyDetails.userInfo._id ? companyDetails.companyLogo : jobApplication?.jobSeeker.profilePicture || '/images/profilepics.png'}
                  alt="avatar"
                  width={40}
                  height={40}
                  className={`h-10 w-10 rounded-full ${message.sender === companyDetails.userInfo._id ? 'ml-2' : 'mr-2'}`}
                  onError={(e) => e.currentTarget.src = '/images/fallback.png'}
                />
                <div className={`p-2 rounded-lg ${message.sender === companyDetails.userInfo._id ? 'bg-blue text-white' : 'bg-gray-200 text-black'}`}>
                  <p>{message.message}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
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
