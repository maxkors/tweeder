import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChatData,
  ChatWithParticipantsData,
  MessageData,
} from "@/query/chatClient";
import { RootState } from "@/store/store";
import StompJs, { Client } from "@stomp/stompjs";

import {
  FormEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import ChatClient from "../../query/chatClient";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import ChatList from "@/components/ChatList";



type Props = {
  children: React.ReactNode
};

const ChatsLayout = ({ children }: Props) => {

  return (
    <div className="flex justify-center">
      <Navigation />
      <div className="flex min-h-screen w-[100%] md:w-[50rem] md:border-x-[1px] border-gray-200">
        <ChatList />
        {children}
      </div>
    </div>
  );
};

export default ChatsLayout;
