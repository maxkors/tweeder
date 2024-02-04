import axios from "axios";

export type Profile = {
  name: string;
  username: string;
  subscriptionsCount: number;
  subscribersCount: number;
};

export async function getProfile(username: string) {
  const response = await axios.get(`http://localhost:8081/api/profiles/${username}`, {
    headers: {
      Authentication: "Bearer " + localStorage.getItem("jwt_token"),
    },
    withCredentials: true,
  });
  return response.data as Profile;
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
