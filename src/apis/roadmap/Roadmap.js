import axios from "axios";
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

const Roadmap = {
  // Fetch a list of roadmaps
  list: async (params = {}) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
      const response = await axios.get(`${BASE_URL}/roadmap`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-tenant-id": X_TENANT_ID,
        },
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching roadmap list:", error.message);
      throw error.response?.data || error.message;
    }
  },

  // Fetch roadmaps by instructor ID
  listByInstructor: async (instructorId, params = {}) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
      const response = await axios.get(
        `${BASE_URL}/roadmap/roadmapByInstructor/${instructorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-tenant-id": X_TENANT_ID,
          },
          params,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching roadmaps by instructor:", error.message);
      throw error.response?.data || error.message;
    }
  },

  // Fetch roadmap details by ID
  getById: async (id, params = {}) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
      const response = await axios.get(`${BASE_URL}/roadmap/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-tenant-id": X_TENANT_ID,
        },
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching roadmap by ID:", error.message);
      throw error.response?.data || error.message;
    }
  },

  // Create a new roadmap
  create: async (data, params = {}) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
      const response = await axios.post(`${BASE_URL}/roadmap`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-tenant-id": X_TENANT_ID,
        },
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating roadmap:", error.message);
      throw error.response?.data || error.message;
    }
  },

  // Update an existing roadmap
  update: async (data, params = {}) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
      const response = await axios.patch(`${BASE_URL}/roadmap`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-tenant-id": X_TENANT_ID,
        },
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating roadmap:", error.message);
      throw error.response?.data || error.message;
    }
  },

  // Delete a roadmap by ID
  delete: async (id, params = {}) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
      const response = await axios.delete(`${BASE_URL}/roadmap/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-tenant-id": X_TENANT_ID,
        },
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting roadmap:", error.message);
      throw error.response?.data || error.message;
    }
  },
};

export default Roadmap;
