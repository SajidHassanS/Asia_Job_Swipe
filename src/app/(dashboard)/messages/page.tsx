import Title from "@/components/Title";
import { Metadata } from "next";
import MessageList from './components/MessageList'
export const metadata: Metadata = {
  title: "Messages",
  description: "Asia JobsSwipe Admin Panel - Messages",
};

const MessagesPage = () => {
  return  <Title
  title="Messages"
  className="w-full min-h-screen flex flex-col bg-background p-4"
>
<MessageList/>;
</Title>
};

export default MessagesPage;
