import axios from "axios";

export type User = {
  id: number;
  username: string;
  name: string;
};

export type CommentData = {
  id: number;
  user: User;
  text: string;
  likesCount: number;
  dateTime: string;
};

export type TweetData = {
  id: number;
  user: User;
  text: string;
  commentsCount: number;
  likesCount: number;
  dateTime: string;
};

export type TweetDataWithComments = {
  id: number;
  user: User;
  comments: CommentData[];
  text: string;
  likesCount: number;
  commentsCount: number;
  dateTime: string;
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
