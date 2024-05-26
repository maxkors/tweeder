import axios from "axios";
import { BASE_PATH } from "./paths";

const getConfigWithToken = () => ({
  headers: {
    Authentication: "Bearer " + localStorage.getItem("jwt_token"),
  },
  withCredentials: true,
});

export type MediaData = {
  name: string;
  type: string;
};

export async function getPresignedUrl(media: MediaData) {
  const response = await axios.post(
    `${BASE_PATH}/storage`,
    media,
    getConfigWithToken()
  );
  return response.data;
}

export default {
  getPresignedUrl
}
