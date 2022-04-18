import { baseURL } from "../utilities/Config";
import axios from "axios";
import { toast } from "react-toastify";

export const login = async (data) => {
  const id = toast.loading("Please wait...");
  try {
    const response = await axios({
      method: "post",
      url: `https://centralin-staging.clusterfintech.com/api/Users`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.update(id, {
      render: response.data.message,
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 500)
      toast.update(id, {
        render: error.response.data.message || "Something went wrong !!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    else
      toast.update(id, {
        render: error.response.data.message || "Something went wrong !!",
        type: "warn",
        isLoading: false,
        autoClose: 3000,
      });

    return error.response;
  }
};
