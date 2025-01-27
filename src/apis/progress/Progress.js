import axios from "axios";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";

// Destructure environment variables from expo-config
const { REACT_APP_API_HOST, REACT_APP_BASE_HOST_URL, REACT_APP_X_TENANT_ID } =
  Constants.expoConfig?.extra || {};

class Progress {
  constructor(token) {
    this.token = token;
    this.instance = axios.create({
      baseURL: `${REACT_APP_API_HOST}${REACT_APP_BASE_HOST_URL}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-tenant-id": REACT_APP_X_TENANT_ID,
        Authorization: `Bearer ${this.token || ""}`,
      },
    });

    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Modify request config if needed
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
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
      const response = await this.instance.get("/progress", { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getById(id, params = {}) {
    try {
      const response = await this.instance.get(`/progress/${id}`, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

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

  async create(data, params = {}) {
    try {
      const response = await this.instance.post("/progress", data, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(data, params = {}) {
    try {
      const response = await this.instance.patch("/progress", data, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

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
