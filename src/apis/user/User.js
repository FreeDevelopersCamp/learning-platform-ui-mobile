import axios from "axios";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";

// Destructure environment variables from expo-config
const { REACT_APP_API_HOST, REACT_APP_BASE_HOST_URL, REACT_APP_X_TENANT_ID } =
  Constants.expoConfig?.extra || {};

const BASE_URL = `${REACT_APP_API_HOST}${REACT_APP_BASE_HOST_URL}`;
const X_TENANT_ID = REACT_APP_X_TENANT_ID;

export const User = {
  // Generic request handler
  async request(config) {
    try {
      const response = await axios({
        baseURL: BASE_URL, // Use combined base URL
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-tenant-id": X_TENANT_ID, // Use environment variable for tenant ID
          Authorization: `Bearer ${config.token || ""}`, // Pass token dynamically
        },
        ...config,
      });
      return response.data; // Return the response data
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      // Show error toast
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
  async list(params = {}, token = "") {
    return await this.request({
      url: "/user",
      method: "GET",
      params,
      token,
    });
  },

  // Update a user
  async update(data, params = {}, token = "") {
    return await this.request({
      url: "/user",
      method: "PATCH",
      data,
      params,
      token,
    });
  },

  // Fetch user details by username
  async getByUserName(userName, params = {}, token = "") {
    return await this.request({
      url: `/user/getByUserName/${userName}`,
      method: "GET",
      params,
      token,
    });
  },

  // Fetch user details by ID
  async getById(id, params = {}, token = "") {
    return await this.request({
      url: `/user/${id}`,
      method: "GET",
      params,
      token,
    });
  },

  // Delete a user by ID
  async delete(id, params = {}, token = "") {
    return await this.request({
      url: `/user/${id}`,
      method: "DELETE",
      params,
      token,
    });
  },
};
