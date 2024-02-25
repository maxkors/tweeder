import axios from "axios";

export type User = {
  id: number;
  username: string;
  name: string;
};

export type Media = {
  id: number;
  type: string;
  urn: string;
};

export type ChildData = {
  id: number;
  user: User;
  text: string;
  likesCount: number;
  commentsCount: number;
  dateTime: string;
  media: Media[];
  liked: boolean;
  bookmarked: boolean;
};

export type TweetData = {
  id: number;
  user: User;
  text: string;
  commentsCount: number;
  likesCount: number;
  dateTime: string;
  media: Media[];
  liked: boolean;
  bookmarked: boolean;
};

export type TweetDataWithChildren = {
  id: number;
  user: User;
  children: ChildData[];
  text: string;
  likesCount: number;
  commentsCount: number;
  dateTime: string;
  media: Media[];
  liked: boolean;
  bookmarked: boolean;
};

const getConfigWithToken = () => ({
  headers: {
    Authentication: "Bearer " + localStorage.getItem("jwt_token"),
  },
  withCredentials: true,
});

export async function getAllTweets() {
  const response = await axios.get(
    "http://localhost:8081/api/tweets/feed",
    getConfigWithToken()
  );
  return response.data;
}

export async function getTweetById(id: number) {
  const response = await axios.get(
    `http://localhost:8081/api/tweets/${id}`,
    getConfigWithToken()
  );
  return response.data;
}

export async function deletePostById(id: number) {
  const response = await axios.delete(
    `http://localhost:8081/api/tweets/${id}`,
    getConfigWithToken()
  );
  return response.data;
}

export async function getPostsByUsername(username: string) {
  const response = await axios.get(
    `http://localhost:8081/api/tweets/users/${username}`,
    getConfigWithToken()
  );
  return response.data;
}

export async function getLikedPosts(username: string) {
  const response = await axios.get(
    `http://localhost:8081/api/tweets/users/${username}/liked`,
    getConfigWithToken()
  );
  return response.data;
}

export async function createPost(content: string, parentPostId?: number) {
  const response = await axios.post(
    `http://localhost:8081/api/tweets`,
    {
      text: content,
      parentPostId: parentPostId || null,
    },
    getConfigWithToken()
  );
  return response;
}

export async function addLikeToPost(id: number) {
  const response = await axios.post(
    `http://localhost:8081/api/tweets/${id}/like`,
    null,
    getConfigWithToken()
  );
  return response;
}

export async function removeLikeFromPost(id: number) {
  const response = await axios.delete(
    `http://localhost:8081/api/tweets/${id}/like`,
    getConfigWithToken()
  );
  return response;
}

export async function addPostToBookmarks(id: number) {
  const response = await axios.post(
    `http://localhost:8081/api/tweets/${id}/bookmark`,
    null,
    getConfigWithToken()
  );
  return response;
}

export async function removePostFromBookmarks(id: number) {
  const response = await axios.delete(
    `http://localhost:8081/api/tweets/${id}/bookmark`,
    getConfigWithToken()
  );
  return response;
}

export async function getBookmarkedPosts() {
  const response = await axios.get(
    `http://localhost:8081/api/tweets/bookmarked`,
    getConfigWithToken()
  );
  return response;
}
