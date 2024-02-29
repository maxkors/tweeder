import axios from "axios";

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
  const response = await axios.get(`http://localhost:8081/api/users/${username}`, {
    headers: {
      Authentication: "Bearer " + localStorage.getItem("jwt_token"),
    },
    withCredentials: true,
  });
  return response.data as Profile;
}

async function searchProfiles(username: string) {
  const response = await axios.get(`http://localhost:8081/api/users/search?name=${username}`, {
    headers: {
      Authentication: "Bearer " + localStorage.getItem("jwt_token"),
    },
    withCredentials: true,
  });
  return response;
}

export async function signIn(username: string, password: string) {
  const response = await axios.post(
    "http://localhost:8081/api/auth/signin",
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
    "http://localhost:8081/api/auth/signup",
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

async function follow(subjectUsername: string) {
  const response = await axios.post(
    `http://localhost:8081/api/users/${subjectUsername}/follow`,
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
    `http://localhost:8081/api/users/${subjectUsername}/follow`,
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
