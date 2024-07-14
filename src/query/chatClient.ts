import axios from "axios";
import { BASE_PATH } from "./paths";
import { SimpleProfile } from "./userClient";
import { User } from "./tweetClient";

const getConfigWithToken = () => ({
  headers: {
    Authentication: "Bearer " + localStorage.getItem("jwt_token"),
  },
  withCredentials: true,
});

export type ChatData = {
  id: number;
};

export type ChatWithParticipantsData = {
  id: number;
  participants: User[];
};

export type MessageData = {
  id: number;
  sender: SimpleProfile;
  chat: ChatData;
  text: string;
};

async function getAllUsersChats() {
  const response = await axios.get(`${BASE_PATH}/chats`, getConfigWithToken());
  return response.data;
}

async function createChat(username: string) {
  const response = await axios.post(
    `${BASE_PATH}/chats`,
    {
      username,
    },
    getConfigWithToken()
  );
  return response.data as ChatData;
}

async function getAllChatMessages(chatId: number) {
  const response = await axios.get(
    `${BASE_PATH}/chats/${chatId}/messages`,
    getConfigWithToken()
  );
  return response.data;
}

export default {
  getAllUsersChats,
  getAllChatMessages,
  createChat,
};
