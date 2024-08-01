import Title from "@/components/Title";
import { Metadata } from "next";
// import MessageList from './components/MessageList'
// import DashboardLayout from "../dashboard/layout";
export const metadata: Metadata = {
  title: "Messages",
  description: "Asia JobsSwipe Admin Panel - Messages",
};

const MessagesPage = () => {
  return (

    // <DashboardLayout>
    <Title
  title="Messages"
  className="w-full min-h-screen flex flex-col bg-background p-4"
>
  <h1>hello</h1>
{/* <MessageList/>; */}
</Title>
  // </DashboardLayout>
  )

  
};

export default MessagesPage;
