import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

// ✅ Extract environment variables from expo-config
const { REACT_APP_API_HOST, REACT_APP_X_TENANT_ID } =
  Constants.expoConfig?.extra || {};

const BASE_URL = `${REACT_APP_API_HOST}`;
const X_TENANT_ID = REACT_APP_X_TENANT_ID;

let socket;

// ✅ Function to get token from AsyncStorage
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.error("❌ No token found in AsyncStorage.");
      return null;
    }
    return token;
  } catch (error) {
    console.error("❌ Failed to retrieve token:", error);
    return null;
  }
};

// ✅ Initialize WebSocket Connection
export const initializeSocket = async ({ tenantId = X_TENANT_ID, userId }) => {
  const token = await getToken();
  if (!token) {
    console.error(
      "❌ Missing authentication token. Cannot connect to WebSocket."
    );
    return null;
  }

  try {
    socket = io(`${BASE_URL}`, {
      auth: { token: `Bearer ${token}`, userId, tenantId },
      transports: ["websocket", "polling"], // ✅ Ensure fallback transport
    });

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket server:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Disconnected from WebSocket:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ WebSocket connection error:", error.message);
    });

    return socket;
  } catch (error) {
    console.error("❌ Error initializing WebSocket:", error);
    return null;
  }
};

// ✅ Disconnect WebSocket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("⚠️ WebSocket disconnected.");
  }
};
