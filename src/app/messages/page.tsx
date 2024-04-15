"use client";

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

let stompClient: Client;

// type ChatMessage = {
//   content: string;
//   sender: string;
//   messageType: string;
// };

const MessagesPage = () => {
  const searchParams = useSearchParams();
  const username = useSelector((state: RootState) => state.profile.username);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [chats, setChats] = useState<ChatWithParticipantsData[]>([]);
  const [currentChatId, setCurrentChatId] = useState<number>(0);
  // used for "stompClient" immutable "onConnect" callback
  const currentChatIdRef = useRef<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  // const stompClient = useRef(
  //   new StompJs.Client({
  //     brokerURL: "ws://localhost:8081/gs-guide-websocket",
  //   })
  // );

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
        chatId: currentChatId,
        invitedUsername: null,
        content: inputValue,
      }),
    });
    setInputValue("");
  };

  const onChatClickHandler = (event: SyntheticEvent<HTMLElement>) => {
    const chatId = Number(event.currentTarget.dataset.id);
    console.log("currentChatId: " + chatId);
    setCurrentChatId(chatId);
    currentChatIdRef.current = chatId;
    ChatClient.getAllChatMessages(chatId).then((messages) => {
      console.log(messages);
      setMessages(messages);
    });
  };

  const filterChats = (chats: ChatWithParticipantsData[], username: string) => {
    console.log("filtering with: " + username);
    console.log(chats);
    
    // chats.forEach((c) => {
    //   console.log(c.participants);
    //   if (c.participants.length === 2) {
    //     const participant = c.participants.find((p) => p.username === username);
    //     console.log("participant: " + participant);
    //     if (participant) {
    //       setCurrentChatId(c.id);
    //       currentChatIdRef.current = c.id;
    //       ChatClient.getAllChatMessages(c.id).then((messages) => {
    //         console.log(messages);
    //         setMessages(messages);
    //       });
    //     } else {
    //       ChatClient.createChat(username).then((chat) => {
    //         console.log("CREATING NEW CHAT");
    //         setChats((prev) => prev.concat(chat));
    //         setCurrentChatId(chat.id);
    //         currentChatIdRef.current = chat.id;
    //       });
    //     }
    //   }
    // });

    const chat = chats.find(c => c.participants.find((p) => p.username === username));
    if (chat) {
      setCurrentChatId(chat.id);
      currentChatIdRef.current = chat.id;
      ChatClient.getAllChatMessages(chat.id).then((messages) => {
        console.log(messages);
        setMessages(messages);
      });
    } else {
      ChatClient.createChat(username).then((chat) => {
        console.log("CREATING NEW CHAT");
        setChats((prev) => prev.concat(chat));
        setCurrentChatId(chat.id);
        currentChatIdRef.current = chat.id;
      });
    }
  };

  const checkUsernameParam = useCallback((c: any) => {
    const usernameParam = searchParams.get("username");
    console.log("username param: " + usernameParam);
    if (usernameParam) {
      filterChats(c, usernameParam);
    }
  }, []);

  useEffect(() => {
    console.log("MOUNT");
    ChatClient.getAllUsersChats().then((chats) => {
      setChats(chats);
      // shitcode, rewrite later
      checkUsernameParam(chats);
    });
  }, [checkUsernameParam]);

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
          const chatMessage: MessageData = JSON.parse(message.body);
          console.log(chatMessage);
          console.log(chatMessage.chat.id);
          console.log(currentChatIdRef.current);
          if (chatMessage.chat.id === currentChatIdRef.current) {
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
    <div className="flex justify-center">
      <Navigation />
      <div className="flex min-h-screen w-[100%] md:w-[50rem] md:border-x-[1px] border-gray-200">
        <aside className="border-r-[1px] border-gray-200 w-[15rem] min-h-screen">
          <header className="pl-3 py-2">
            <p className="font-bold text-lg">Messages</p>
          </header>
          <div>
            {chats.map((chat) => (
              <p
                className={cn(
                  "p-2 border-2 border-gray-200 cursor-pointer",
                  chat.id === currentChatId && "bg-gray-200"
                )}
                key={chat.id}
                data-id={chat.id}
                onClick={onChatClickHandler}
              >
                {chat.participants
                  .filter((p) => p.username !== username)
                  .map((p) => p.username)
                  .join(", ")}
              </p>
            ))}
          </div>
        </aside>
        <main className="flex-grow">
          {currentChatId > 0 && (
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
          )}
        </main>
      </div>
    </div>
  );
};

export default MessagesPage;
