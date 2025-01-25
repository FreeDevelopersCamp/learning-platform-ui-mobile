import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

// Destructure environment variables from expo-config
const { REACT_APP_API_HOST, REACT_APP_BASE_HOST_URL, REACT_APP_X_TENANT_ID } =
  Constants.expoConfig?.extra || {};

const BASE_URL = `${REACT_APP_API_HOST}${REACT_APP_BASE_HOST_URL}`;

export const Auth = {
  login: async (userName, password, role) => {
    try {
      const response = await fetch(`${BASE_URL}/Auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-tenant-id": REACT_APP_X_TENANT_ID,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password, role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Login failed. Please try again.";

        Toast.show({
          type: "error",
          position: "top",
          text1: "Login Failed",
          text2: errorMessage,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 40,
          bottomOffset: 40,
          style: { zIndex: 1000 },
        });

        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Store token in AsyncStorage
      await AsyncStorage.setItem("token", data.token);

      Toast.show({
        type: "success",
        position: "top",
        text1: "Login Successful",
        text2: "Welcome back!",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 40,
        bottomOffset: 40,
        style: { zIndex: 1000 },
      });

      return data; // Return the response data
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Login Failed",
        text2: error.message || "An error occurred. Please try again.",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 40,
        bottomOffset: 40,
        style: { zIndex: 1000 },
      });
      throw error;
    }
  },

  getSession: async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      const response = await fetch(`${BASE_URL}/Auth/session`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-tenant-id": REACT_APP_X_TENANT_ID,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data; // Return the session data
    } catch (error) {
      console.error("Failed to fetch session:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        throw new Error("No token found. Unable to log out.");
      }

      const response = await fetch(`${BASE_URL}/Auth/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-tenant-id": REACT_APP_X_TENANT_ID,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Logout failed.";
        throw new Error(errorMessage);
      }

      await AsyncStorage.removeItem("token"); // Clear token on successful logout

      Toast.show({
        type: "success",
        position: "top",
        text1: "Logout Successful",
        text2: "You have been logged out.",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 40,
        bottomOffset: 40,
      });

      return true;
    } catch (error) {
      console.error("Logout failed:", error);

      Toast.show({
        type: "error",
        position: "top",
        text1: "Logout Failed",
        text2: error.message || "An error occurred during logout.",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 40,
        bottomOffset: 40,
      });

      throw error;
    }
  },
};
