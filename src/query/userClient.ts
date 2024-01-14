import axios from "axios";

export default async function getProfile() {
  const response = await axios.get("http://localhost:8081/api/profile", {
    headers: {
      "Authentication": "Bearer " + localStorage.getItem("jwt_token"),
    },
    withCredentials: true
  });
  return response.data;
}
