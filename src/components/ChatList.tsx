"use client";

import { ChatWithParticipantsData } from "@/query/chatClient";
import React, { SyntheticEvent, useEffect, useState } from "react";
import ChatClient from "@/query/chatClient";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

function ChatList() {
  const username = useSelector((state: RootState) => state.profile.username);
  const [chats, setChats] = useState<ChatWithParticipantsData[]>([]);
  const [currentChatId, setCurrentChatId] = useState<number>(0);
  const router = useRouter();
  const pathname = usePathname();

  const onChatClickHandler = (event: SyntheticEvent<HTMLElement>) => {
    const chatId = Number(event.currentTarget.dataset.id);
    console.log("currentChatId: " + chatId);
    setCurrentChatId(chatId);
    router.push(`/chats/${chatId}`);
  };

  useEffect(() => {
    console.log("MOUNT");
    ChatClient.getAllUsersChats().then((chats) => {
      setChats(chats);
    });

    console.log("Current route: " + pathname);
  }, []);

  return (
    <aside className={cn("border-r-[1px] border-gray-200 w-full md:w-[15rem] min-h-screen",
      `${pathname !== "/chats" && global?.window && window.innerWidth < 768 ? "hidden" : "block"}`
    )}>
      <header className="pl-3 py-2 border-b-2 border-gray-200">
        <p className="font-bold text-lg">Chats</p>
      </header>
      <div>
        {chats.map((chat) => (
          <p
            className={cn(
              "p-2 border-b-2 border-gray-200 cursor-pointer",
              chat.id === currentChatId && "bg-gray-200"
            )}
            key={chat.id}
            data-id={chat.id}
            onClick={onChatClickHandler}
          >
            {chat.participants
              .filter((p) => p.username !== username)
              .map((p) => p.name)
              .join(", ")}
          </p>
        ))}
      </div>
    </aside>
  );
}

export default ChatList;
