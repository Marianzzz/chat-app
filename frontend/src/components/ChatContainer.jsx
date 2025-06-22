import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

export default function ChatContainer() {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();
  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);
  if (isMessagesLoading) return <div>Завантаження...</div>;
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <p>повідомлення...</p>
      <MessageInput />
    </div>
  );
}
