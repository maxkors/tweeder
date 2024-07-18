import axios from "axios";
import { BASE_PATH } from "./paths";
import { MediaData } from "./storageClient";

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

const getMultipartConfigWithToken = () => ({
  headers: {
    Authentication: "Bearer " + localStorage.getItem("jwt_token"),
    'Content-Type': 'multipart/form-data'
  },
  withCredentials: true,
});

export async function getAllTweets() {
  const response = await axios.get(
    `${BASE_PATH}/tweets/feed`,
    getConfigWithToken()
  );
  console.log(response.data);
  return response.data;
}

export async function getRecommendedTweets() {
  const response = await axios.get(
    `${BASE_PATH}/tweets/recommended`,
    getConfigWithToken()
  );
  console.log(response.data);
  return response.data;
}

export async function getTweetById(id: number) {
  const response = await axios.get(
    `${BASE_PATH}/tweets/${id}`,
    getConfigWithToken()
  );
  return response.data;
}

export async function deletePostById(id: number) {
  const response = await axios.delete(
    `${BASE_PATH}/tweets/${id}`,
    getConfigWithToken()
  );
  return response;
}

export async function getPostsByUsername(username: string) {
  const response = await axios.get(
    `${BASE_PATH}/tweets/users/${username}`,
    getConfigWithToken()
  );
  return response.data;
}

export async function getLikedPosts(username: string) {
  const response = await axios.get(
    `${BASE_PATH}/tweets/users/${username}/liked`,
    getConfigWithToken()
  );
  return response.data;
}

export async function createPost(text: string, media: any, parentPostId?: number) {
  console.log(text, media, parentPostId);
  const response = await axios.post(
    `${BASE_PATH}/tweets`,
    {
      text,
      media,
      parentPostId: parentPostId || null,
    },
    getMultipartConfigWithToken()
  );
  return response;
}

export async function createPost2(formData: FormData) {
  const response = await axios.post(
    `${BASE_PATH}/tweets`,
    formData,
    getMultipartConfigWithToken()
  );
  return response;
}

export async function addLikeToPost(id: number) {
  const response = await axios.post(
    `${BASE_PATH}/tweets/${id}/like`,
    null,
    getConfigWithToken()
  );
  return response;
}

export async function removeLikeFromPost(id: number) {
  const response = await axios.delete(
    `${BASE_PATH}/tweets/${id}/like`,
    getConfigWithToken()
  );
  return response;
}

export async function addPostToBookmarks(id: number) {
  const response = await axios.post(
    `${BASE_PATH}/tweets/${id}/bookmark`,
    null,
    getConfigWithToken()
  );
  return response;
}

export async function removePostFromBookmarks(id: number) {
  const response = await axios.delete(
    `${BASE_PATH}/tweets/${id}/bookmark`,
    getConfigWithToken()
  );
  return response;
}

export async function getBookmarkedPosts() {
  const response = await axios.get(
    `${BASE_PATH}/tweets/bookmarked`,
    getConfigWithToken()
  );
  return response;
}
