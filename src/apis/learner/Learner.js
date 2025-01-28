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
    return await AsyncStorage.getItem("token");
  } catch (error) {
    console.error("Failed to retrieve token:", error);
    return null;
  }
};

class Learner {
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
      (error) => Promise.reject(error)
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

  // List all learners
  async list(params = {}) {
    try {
      const response = await this.instance.get("/learner", { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Update learner
  async update(data, params = {}) {
    try {
      const response = await this.instance.patch("/learner", data, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get learner by ID
  async getById(id, params = {}) {
    try {
      const response = await this.instance.get(`/learner/${id}`, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get learner by User ID
  async getByUserId(id, params = {}) {
    try {
      const response = await this.instance.get(`/learner/user/${id}`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Delete learner by ID
  async delete(id, params = {}) {
    try {
      const response = await this.instance.delete(`/learner/${id}`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Approve learner
  async approve(id, params = {}) {
    try {
      const response = await this.instance.get(`/learner/approve/${id}`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Deactivate learner
  async deactivate(id, params = {}) {
    try {
      const response = await this.instance.delete(`/learner/deactivate/${id}`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Learner;
