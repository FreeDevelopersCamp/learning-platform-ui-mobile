import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";

// Extract environment variables
const { REACT_APP_API_HOST, REACT_APP_BASE_HOST_URL, REACT_APP_X_TENANT_ID } =
  Constants.expoConfig?.extra || {};

const BASE_URL = `${REACT_APP_API_HOST}${REACT_APP_BASE_HOST_URL}`;
const X_TENANT_ID = REACT_APP_X_TENANT_ID;

const getToken = async () => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    console.error("Failed to retrieve token:", error);
    return null;
  }
};

const getDefaultHeaders = async () => {
  const token = await getToken();
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-tenant-id": X_TENANT_ID,
    Authorization: `Bearer ${token || ""}`,
  };
};

class Owner {
  static instance;

  static getInstance() {
    if (!Owner.instance) {
      Owner.instance = new Owner();
    }
    return Owner.instance;
  }

  async request(config) {
    try {
      const headers = await getDefaultHeaders();
      const response = await axios({
        baseURL: BASE_URL,
        ...config,
        headers: { ...headers, ...config.headers },
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
      throw error;
    }
  }

  async list(params = {}) {
    return this.request({ url: "/owner", method: "GET", params });
  }

  async update(data, params = {}) {
    return this.request({ url: "/owner", method: "PATCH", data, params });
  }

  async getById(id, params = {}) {
    return this.request({ url: `/owner/${id}`, method: "GET", params });
  }

  async getByUserId(id, params = {}) {
    return this.request({ url: `/owner/user/${id}`, method: "GET", params });
  }

  async delete(id, params = {}) {
    return this.request({ url: `/owner/${id}`, method: "DELETE", params });
  }

  async approve(id, params = {}) {
    return this.request({ url: `/owner/approve/${id}`, method: "GET", params });
  }

  async reject(id, params = {}) {
    return this.request({
      url: `/owner/reject/${id}`,
      method: "DELETE",
      params,
    });
  }

  async deactivate(id, params = {}) {
    return this.request({
      url: `/owner/deactivate/${id}`,
      method: "DELETE",
      params,
    });
  }
}

export default Owner;
