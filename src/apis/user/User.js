import axios from "axios";
import Toast from "react-native-toast-message";

const BASE_URL = "http://192.168.88.4:3030/api/v1";

export const User = {
  // Generic request handler
  async request(config) {
    try {
      const response = await axios({
        baseURL: BASE_URL,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-tenant-id": "b_1",
          Authorization: `Bearer ${config.token || ""}`,
        },
        ...config,
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      Toast.show({
        type: "error",
        text1: "Request Failed",
        text2: errorMessage,
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 40,
      });

      throw new Error(errorMessage);
    }
  },

  async list(params = {}, token = "") {
    return await User.request({
      url: "/user",
      method: "GET",
      params,
      token,
    });
  },

  async update(data, params = {}, token = "") {
    return await User.request({
      url: "/user",
      method: "PATCH",
      data,
      params,
      token,
    });
  },

  async getByUserName(userName, params = {}, token = "") {
    return await User.request({
      url: `/user/getByUserName/${userName}`,
      method: "GET",
      params,
      token,
    });
  },

  async getById(id, params = {}, token = "") {
    return await User.request({
      url: `/user/${id}`,
      method: "GET",
      params,
      token,
    });
  },

  async delete(id, params = {}, token = "") {
    return await User.request({
      url: `/user/${id}`,
      method: "DELETE",
      params,
      token,
    });
  },
};
