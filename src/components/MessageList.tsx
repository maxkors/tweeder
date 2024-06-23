"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MessageData } from "@/query/chatClient";
import ChatClient from "@/query/chatClient";
import { Client } from "@stomp/stompjs";

type Props = {
    chatId: string;
};

let stompClient: Client;

const MessageList = ({ chatId }: Props) => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

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

  useEffect(() => {
    console.log("MessageList MOUNT");
    ChatClient.getAllChatMessages(Number(chatId)).then((messages) => {
      console.log(messages);
      setMessages(messages);
    });
  }, []);

  useEffect(() => {
    // stompClient.current.onConnect = () => {
    //   stompClient.current.subscribe("/topic/greetings", (greeting) => {
    //     console.log(JSON.parse(greeting.body));
    //     // setMessages(prev => prev.concat())
    //   });
    stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
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
    };

    stompClient.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    <main className="flex-grow">
      <div className="relative h-full">
        {messages.map((message) => (
          <p
            className="p-2 border-2 border-gray-200 cursor-pointer"
            key={message.id}
          >
            <span>{message.sender.username}:</span>
            <span className="ml-2">{message.text}</span>
          </p>
        ))}
        <div className="absolute bottom-0 w-full">
          <form onSubmit={onFormSubmitHandler} className="flex p-4">
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
