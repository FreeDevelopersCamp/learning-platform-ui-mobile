import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
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

class Progress {
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-tenant-id": X_TENANT_ID,
      },
    });

    // Request interceptor to get token and set Authorization header
    this.instance.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors globally
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

  // Fetch a list of progress entries with optional pagination
  async list(params = {}) {
    try {
      const response = await this.instance.get("/progress", { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Fetch progress details by ID
  async getById(id, params = {}) {
    try {
      const response = await this.instance.get(`/progress/${id}`, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Fetch progress by user ID
  async getByUserId(userId, params = {}) {
    try {
      const response = await this.instance.get(`/progress/userId/${userId}`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Create new progress entry
  async create(data, params = {}) {
    try {
      const response = await this.instance.post("/progress", data, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Update an existing progress entry
  async update(data, params = {}) {
    try {
      const response = await this.instance.patch("/progress", data, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Delete progress by ID
  async delete(id, params = {}) {
    try {
      const response = await this.instance.delete(`/progress/${id}`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Progress;
