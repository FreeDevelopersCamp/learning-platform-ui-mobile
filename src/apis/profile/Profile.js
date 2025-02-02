import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";

// Get environment variables from Expo
const { REACT_APP_API_HOST, REACT_APP_BASE_HOST_URL, REACT_APP_X_TENANT_ID } =
  Constants.expoConfig?.extra || {};

const BASE_URL = `${REACT_APP_API_HOST}${REACT_APP_BASE_HOST_URL}`;
const X_TENANT_ID = REACT_APP_X_TENANT_ID;

// Function to get token from AsyncStorage
const getToken = async () => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    console.error("Failed to retrieve token:", error);
    return null;
  }
};

class Profile {
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-tenant-id": X_TENANT_ID,
      },
    });

    // Attach Authorization header dynamically
    this.instance.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Handle API response errors globally
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const errorMessage = error.response?.data?.message || error.message;
        Toast.show({
          type: "error",
          text1: "Request Failed",
          text2: errorMessage,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 40,
        });
        return Promise.reject(error);
      }
    );
  }

  // Fetch user profile by username
  async getByUserName(userName) {
    try {
      const response = await this.instance.get(
        `/profile/getByUserName/${userName}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Update profile
  async update(data) {
    try {
      const response = await this.instance.patch("/profile", data);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new Profile(); // ✅ Ensure it's exported as a singleton instance
