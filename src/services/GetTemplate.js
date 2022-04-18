import { baseURL } from "../../utilities/Config";
import axios from "axios";
import { toast } from "react-toastify";

export const handleGetRequest = async (url) => {
  try {
    const response = await axios.get(`${baseURL + url}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};
