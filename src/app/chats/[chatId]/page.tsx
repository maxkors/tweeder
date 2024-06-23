import MessageList from '@/components/MessageList';
import React from 'react'

type Props = {
  params: {
    chatId: string;
  };
};

function ChatPage({ params }: Props) {
  return (
    <MessageList chatId={params.chatId} />
  )
}

export default ChatPage;