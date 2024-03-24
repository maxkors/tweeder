"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "@/store/store";
import StompJs, { Client } from "@stomp/stompjs";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";

let stompClient: Client;

type ChatMessage = {
  content: string;
  sender: string;
  messageType: string;
};

const MessagesPage = () => {
  const username = useSelector((state: RootState) => state.profile.username);
  const [messages, setMessages] = useState<string[]>([]);
  // const stompClient = useRef(
  //   new StompJs.Client({
  //     brokerURL: "ws://localhost:8081/gs-guide-websocket",
  //   })
  // );

  const onFormSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const message = formData.get("message")?.toString();
    if (!message || message.length < 1) return;
    console.log("trying to send: " + message);
    stompClient.publish({
      destination: "/app/chat/sendMessage",
      body: JSON.stringify({
        content: message,
        type: "CHAT",
      }),
    });
  };

  useEffect(() => {
    // stompClient.current.onConnect = () => {
    //   stompClient.current.subscribe("/topic/greetings", (greeting) => {
    //     console.log(JSON.parse(greeting.body));
    //     // setMessages(prev => prev.concat())
    //   });
    stompClient = new Client({
      brokerURL: "ws://localhost:8081/ws",
      connectHeaders: {
        Authentication: "Bearer " + localStorage.getItem("jwt_token"),
      },
      onConnect: () => {
        console.log("connected");
        stompClient.subscribe("/user/topic/public", (message) => {
          console.log(`Received: ${message.body}`);
          setMessages((prev) => prev.concat(message.body));
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
    <div>
      <form onSubmit={onFormSubmitHandler} className="flex p-4">
        <Input type="text" name="message" className="w-60 mr-4" />
        <Button type="submit">Send</Button>
      </form>
      <div>
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;
