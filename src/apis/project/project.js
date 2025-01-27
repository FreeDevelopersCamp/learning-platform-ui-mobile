import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

// Destructure environment variables from expo-config
const { REACT_APP_API_HOST, REACT_APP_BASE_HOST_URL, REACT_APP_X_TENANT_ID } =
  Constants.expoConfig?.extra || {}; // Ensure environment variables are available

const BASE_URL = `${REACT_APP_API_HOST}${REACT_APP_BASE_HOST_URL}`;

class Project {
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL, // Combine base URL and path
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-tenant-id": REACT_APP_X_TENANT_ID,
      },
    });

    // Request interceptor for handling requests globally
    this.instance.interceptors.request.use(
      async (config) => {
        // Get token from AsyncStorage and add it to the Authorization header
        const token = await AsyncStorage.getItem("token");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for handling responses globally
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

  // Fetch a list of projects with optional pagination
  async list(params = {}) {
    try {
      const response = await this.instance.get("/project", { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Fetch project details by ID
  async getById(projectId, params = {}) {
    try {
      const response = await this.instance.get(`/project/${projectId}`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Create a new project
  async create(data, params = {}) {
    try {
      const response = await this.instance.post("/project", data, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Update an existing project
  async update(data, params = {}) {
    try {
      const response = await this.instance.patch("/project", data, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Delete a project by ID
  async delete(projectId, params = {}) {
    try {
      const response = await this.instance.delete(`/project/${projectId}`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Project;
