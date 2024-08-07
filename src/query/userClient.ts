import axios from "axios";
import { BASE_PATH } from "./paths";

export type Profile = {
  name: string;
  username: string;
  avatarUrl: string;
  subscriptionsCount: number;
  subscribersCount: number;
  isFollowed: boolean;
};

export type SimpleProfile = {
  id: number;
  name: string;
  username: string;
  avatarUrl: string;
};

export type ProfileData = {
  username: string;
  name: string;
  email: string;
  avatarUrl: string;
};

async function getUserData(username: string) {
  const response = await axios.get(`${BASE_PATH}/users/${username}`, {
    headers: {
      Authentication: "Bearer " + localStorage.getItem("jwt_token"),
    },
    withCredentials: true,
  });
  return response.data as ProfileData;
}

async function editUserData(
  currentUsername: string,
  username: string,
  name: string,
  email: string,
  avatar: any
) {
  const response = await axios.put(
    `${BASE_PATH}/users/${currentUsername}`,
    {
      username,
      name,
      email,
      avatar
    },
    {
      headers: {
        Authentication: "Bearer " + localStorage.getItem("jwt_token"),
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
  return response.data as ProfileData;
}

export async function getProfile(username: string) {
  const response = await axios.get(`${BASE_PATH}/users/${username}/profile`, {
    headers: {
      Authentication: "Bearer " + localStorage.getItem("jwt_token"),
    },
    withCredentials: true,
  });
  return response.data as Profile;
}

async function searchProfiles(username: string) {
  const response = await axios.get(
    `${BASE_PATH}/users/search?name=${username}`,
    {
      headers: {
        Authentication: "Bearer " + localStorage.getItem("jwt_token"),
      },
      withCredentials: true,
    }
  );
  return response;
}

export async function signIn(username: string, password: string) {
  const response = await axios.post(
    `${BASE_PATH}/auth/signin`,
    {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );

  return response;
}

export async function signUp(
  name: string,
  email: string,
  username: string,
  password: string
) {
  const response = await axios.post(
    `${BASE_PATH}/auth/signup`,
    {
      name,
      email,
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );

  return response;
}

async function follow(subjectUsername: string) {
  const response = await axios.post(
    `${BASE_PATH}/users/${subjectUsername}/follow`,
    null,
    {
      headers: {
        Authentication: "Bearer " + localStorage.getItem("jwt_token"),
      },
      withCredentials: true,
    }
  );

  return response;
}

async function unfollow(subjectUsername: string) {
  const response = await axios.delete(
    `${BASE_PATH}/users/${subjectUsername}/follow`,
    {
      headers: {
        Authentication: "Bearer " + localStorage.getItem("jwt_token"),
      },
      withCredentials: true,
    }
  );

  return response;
}

async function getSubscriptions(username: string) {
  const response = await axios.get(
    `${BASE_PATH}/users/${username}/subscriptions`,
    {
      headers: {
        Authentication: "Bearer " + localStorage.getItem("jwt_token"),
      },
      withCredentials: true,
    }
  );
  return response.data as SimpleProfile[];
}

async function getSubscribers(username: string) {
  const response = await axios.get(
    `${BASE_PATH}/users/${username}/subscribers`,
    {
      headers: {
        Authentication: "Bearer " + localStorage.getItem("jwt_token"),
      },
      withCredentials: true,
    }
  );
  return response.data as SimpleProfile[];
}

export default {
  follow,
  unfollow,
  searchProfiles,
  getSubscriptions,
  getSubscribers,
  getUserData,
  editUserData,
};
