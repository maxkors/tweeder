import axios from "axios";

export type User = {
  id: number;
  username: string;
  name: string;
};

export type ChildrenData = {
  id: number;
  user: User;
  text: string;
  likesCount: number;
  dateTime: string;
  liked: boolean;
};

export type TweetData = {
  id: number;
  user: User;
  text: string;
  commentsCount: number;
  likesCount: number;
  dateTime: string;
  liked: boolean
};

export type TweetDataWithChildren = {
  id: number;
  user: User;
  children: ChildrenData[];
  text: string;
  likesCount: number;
  commentsCount: number;
  dateTime: string;
  liked: boolean;
};

export async function getAllTweets() {
  const response = await axios.get("http://localhost:8081/api/tweets/feed", {
    headers: {
      Authentication: "Bearer " + localStorage.getItem("jwt_token"),
    },
    withCredentials: true,
  });
  return response.data;
}

export async function getTweetById(id: number) {
  const response = await axios.get(`http://localhost:8081/api/tweets/${id}`, {
    headers: {
      Authentication: "Bearer " + localStorage.getItem("jwt_token"),
    },
    withCredentials: true,
  });
  return response.data;
}

export async function createTweet(content: string) {
  const response = await axios.post(
    `http://localhost:8081/api/tweets`,
    {
      text: content,
    },
    {
      headers: {
        Authentication: "Bearer " + localStorage.getItem("jwt_token"),
      },
      withCredentials: true,
    }
  );
  return response;
}

export async function createComment(tweetId: number, content: string) {
  const response = await axios.post(
    `http://localhost:8081/api/comments`,
    {
      tweetId,
      content,
    },
    {
      headers: {
        Authentication: "Bearer " + localStorage.getItem("jwt_token"),
      },
      withCredentials: true,
    }
  );
  return response;
}
