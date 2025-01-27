import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

// Destructure environment variables from expo-config
const { REACT_APP_API_HOST, REACT_APP_BASE_HOST_URL, REACT_APP_X_TENANT_ID } =
  Constants.expoConfig?.extra || {};

const BASE_URL = `${REACT_APP_API_HOST}${REACT_APP_BASE_HOST_URL}`;
const X_TENANT_ID = REACT_APP_X_TENANT_ID;

// Function to get token from AsyncStorage
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Failed to retrieve token:", error);
    return null;
  }
};

export const User = {
  // Generic request handler
  async request(config) {
    try {
      const token = await getToken();
      const response = await axios({
        baseURL: BASE_URL,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-tenant-id": X_TENANT_ID,
          Authorization: `Bearer ${token || ""}`,
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

      throw new Error(errorMessage); // Throw error for further handling
    }
  },

  // Fetch the list of users
  async list(params = {}) {
    return await this.request({
      url: "/user",
      method: "GET",
      params,
    });
  },

  // Update a user
  async update(data, params = {}) {
    return await this.request({
      url: "/user",
      method: "PATCH",
      data,
      params,
    });
  },

  // Fetch user details by username
  async getByUserName(userName, params = {}) {
    return await this.request({
      url: `/user/getByUserName/${userName}`,
      method: "GET",
      params,
    });
  },

  // Fetch user details by ID
  async getById(id, params = {}) {
    return await this.request({
      url: `/user/${id}`,
      method: "GET",
      params,
    });
  },

  // Delete a user by ID
  async delete(id, params = {}) {
    return await this.request({
      url: `/user/${id}`,
      method: "DELETE",
      params,
    });
  },
};
