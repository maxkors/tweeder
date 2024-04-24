import axios from "axios";
import { BASE_PATH } from "./paths";

export type Profile = {
  name: string;
  username: string;
  subscriptionsCount: number;
  subscribersCount: number;
  isFollowed: boolean;
};

export type SimpleProfile = {
  id: number;
  name: string;
  username: string;
};

export async function getProfile(username: string) {
  const response = await axios.get(`${BASE_PATH}/users/${username}`, {
    headers: {
      Authentication: "Bearer " + localStorage.getItem("jwt_token"),
    },
    withCredentials: true,
  });
  return response.data as Profile;
}

async function searchProfiles(username: string) {
  const response = await axios.get(`${BASE_PATH}/users/search?name=${username}`, {
    headers: {
      Authentication: "Bearer " + localStorage.getItem("jwt_token"),
    },
    withCredentials: true,
  });
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

export async function signUp(name: string, email: string, username: string, password: string) {
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

export default {
  follow,
  unfollow,
  searchProfiles
}
