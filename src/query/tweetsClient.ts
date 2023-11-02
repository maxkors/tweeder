import axios from "axios";

export default async function getAllTweets() {
  const response = await axios.get("http://localhost:8080/api/tweets");
  return response.data;
}