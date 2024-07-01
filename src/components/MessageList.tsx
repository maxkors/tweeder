"use client";

import React, { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MessageData } from "@/query/chatClient";
import ChatClient from "@/query/chatClient";
import { Client } from "@stomp/stompjs";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { cn } from "@/lib/utils";

type Props = {
  chatId: string;
};

let stompClient: Client;

const MessageList = ({ chatId }: Props) => {
  const username = useSelector((state: RootState) => state.profile.username);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();

  const onFormSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const chatId = formData.get("chatId")?.toString();
    // if (!chatId || chatId.length < 1) return;

    // const invitedUsername = formData.get("invitedUsername")?.toString();
    // if (!invitedUsername || invitedUsername.length < 1) return;

    if (inputValue.length < 1) return;

    console.log("trying to send: " + inputValue);
    stompClient.publish({
      destination: "/app/chat/sendMessage",
      body: JSON.stringify({
        chatId: Number(chatId),
        invitedUsername: null,
        content: inputValue,
      }),
    });
    setInputValue("");
  };

  const onBackArrowClick = (event: SyntheticEvent<HTMLElement>) => {
    router.back();
  };

  useEffect(() => {
    console.log("MessageList MOUNT");
    ChatClient.getAllChatMessages(Number(chatId)).then((messages) => {
      console.log(messages);
      setMessages(messages);
    });
    console.log("Current route: " + pathname);
  }, []);

  useEffect(() => {
    // stompClient.current.onConnect = () => {
    //   stompClient.current.subscribe("/topic/greetings", (greeting) => {
    //     console.log(JSON.parse(greeting.body));
    //     // setMessages(prev => prev.concat())
    //   });
    stompClient = new Client({
      // brokerURL: "ws://localhost:8080/ws",
      brokerURL: "ws://192.168.0.73:8080/ws",
      connectHeaders: {
        Authentication: "Bearer " + localStorage.getItem("jwt_token"),
      },
      onConnect: () => {
        console.log("connected");
        stompClient.subscribe("/user/topic/public", (message) => {
          console.log(`Received: ${message.body}`);
          const chatMessage: MessageData = JSON.parse(message.body);
          console.log(chatMessage);
          console.log(chatMessage.chat.id);
          console.log(chatId);
          if (chatMessage.chat.id === Number(chatId)) {
            setMessages((prev) => prev.concat(chatMessage));
          }
        });
      },
      // webSocketFactory: () => new SockJS("ws://localhost:8081/ws"),
    });

    stompClient.onWebSocketError = (error) => {
      console.error("Error with websocket", error);
      // alert(`Error with websocket, ${JSON.stringify(error)}`)
    };

    stompClient.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
      // alert(`Error with stomp, ${frame.headers["message"]}`)
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  // ADD BACK TO CHATS BUTTON FOR MOBILE DEVICES
  return (
    <main className="flex-grow">
      <div className="relative h-full">
        <header className="h-11 items-center border-b-[1px] border-gray-200 p-2 flex md:hidden sticky top-0 z-10 bg-white">
          <div onClick={onBackArrowClick}>
            <FaArrowLeft className="h-5 w-5 ml-2 mr-5 hover:cursor-pointer" />
          </div>
          <p className="font-bold text-lg">
            {
              messages.filter((m) => m?.sender.username !== username)[0]?.sender
                .name
            }
          </p>
        </header>
        <div className="flex flex-col text-slate-100 px-2 h-[calc(100vh-6.25rem)] md:h-[calc(100vh-3.5rem)] overflow-auto border-b-[1px] border-gray-200">
          {messages.map((message) => (
            <p
              className={cn(
                "px-4 py-2 my-1 rounded-2xl",
                message.sender.username === username
                  ? "self-end bg-gray-500 rounded-br-none"
                  : "self-start bg-gray-700 rounded-bl-none"
              )}
              key={message.id}
            >
              <span>{message.text}</span>
            </p>
          ))}
        </div>
        <div className="sticky bottom-0 w-full bg-white z-10">
          <form onSubmit={onFormSubmitHandler} className="flex h-14 items-center px-2">
            <Input
              type="text"
              name="content"
              className="mr-4 flex-grow"
              placeholder="content"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default MessageList;
