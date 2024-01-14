import axios from "axios";

export default async function getAllTweets() {
  const response = await axios.get(
    "http://localhost:8081/api/tweets/feed", 
    {
      headers: {
        Authentication: "Bearer " + localStorage.getItem("jwt_token"),
      },
      withCredentials: true
    }
  );
  return response.data;
}
