import axios from "axios";

export type User = {
  id: number;
  username: string;
  name: string;
};

export type ChildData = {
  id: number;
  user: User;
  text: string;
  likesCount: number;
  commentsCount: number;
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
  liked: boolean;
};

export type TweetDataWithChildren = {
  id: number;
  user: User;
  children: ChildData[];
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

export async function getPostsByUsername(username: string) {
  const response = await axios.get(`http://localhost:8081/api/tweets/users/${username}`, {
    headers: {
      Authentication: "Bearer " + localStorage.getItem("jwt_token"),
    },
    withCredentials: true,
  });
  return response.data;
}

export async function getLikedPosts(username: string) {
  const response = await axios.get(`http://localhost:8081/api/tweets/users/${username}/liked`, {
    headers: {
      Authentication: "Bearer " + localStorage.getItem("jwt_token"),
    },
    withCredentials: true,
  });
  return response.data;
}

export async function createPost(content: string, parentPostId?: number) {
  const response = await axios.post(
    `http://localhost:8081/api/tweets`,
    {
      text: content,
      parentPostId: parentPostId || null,
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
