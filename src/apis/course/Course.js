import axios from "axios";
import Toast from "react-native-toast-message";
import Constants from "expo-constants"; // To use expo-config for API configuration

// Destructure environment variables from expo-config
const { REACT_APP_API_HOST, REACT_APP_BASE_HOST_URL, REACT_APP_X_TENANT_ID } =
  Constants.expoConfig?.extra || {}; // Ensure environment variables are available

class Course {
  constructor(token) {
    this.token = token;
    this.instance = axios.create({
      baseURL: `${REACT_APP_API_HOST}${REACT_APP_BASE_HOST_URL}`, // Combine base URL and path
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-tenant-id": REACT_APP_X_TENANT_ID,
        Authorization: `Bearer ${this.token || ""}`,
      },
    });

    // Request interceptor for handling requests globally
    this.instance.interceptors.request.use(
      (config) => {
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

  async list(params = {}) {
    try {
      const response = await this.instance.get("/course", { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getById(id, params = {}) {
    try {
      const response = await this.instance.get(`/course/${id}`, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(data, params = {}) {
    try {
      const response = await this.instance.post("/course", data, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(data, params = {}) {
    try {
      const response = await this.instance.patch("/course", data, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(id, params = {}) {
    try {
      const response = await this.instance.delete(`/course/${id}`, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Course;
