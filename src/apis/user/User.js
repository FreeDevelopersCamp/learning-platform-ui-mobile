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
    console.error("❌ Failed to retrieve token:", error);
    return null;
  }
};

// ✅ Function to make authenticated API requests
const request = async (config) => {
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
    console.error("❌ API Request Failed:", errorMessage);

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
};

// ✅ User API Functions
export const User = {
  // Fetch users list
  list: async (params = {}) => {
    return await request({
      url: "/user",
      method: "GET",
      params,
    });
  },

  // Fetch current user session
  listSession: async () => {
    return await request({
      url: "/Auth/session",
      method: "GET",
    });
  },

  // Fetch active sessions
  listSessions: async () => {
    return await request({
      url: "/Auth/sessions",
      method: "GET",
    });
  },

  // Fetch user by username
  getByUserName: async (userName, params = {}) => {
    return await request({
      url: `/user/getByUserName/${userName}`,
      method: "GET",
      params,
    });
  },

  // Fetch user by ID
  getById: async (id, params = {}) => {
    return await request({
      url: `/user/${id}`,
      method: "GET",
      params,
    });
  },

  // Update user
  update: async (data, params = {}) => {
    return await request({
      url: "/user",
      method: "PATCH",
      data,
      params,
    });
  },

  // Delete user by ID
  delete: async (id, params = {}) => {
    return await request({
      url: `/user/${id}`,
      method: "DELETE",
      params,
    });
  },
};
