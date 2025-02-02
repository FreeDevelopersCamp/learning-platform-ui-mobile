import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Auth } from "../../apis/auth/Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false });
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch session details and set the authentication state
  const fetchSession = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        setAuth({ isAuthenticated: false, role: null });
        return;
      }

      const session = await Auth.getSession();

      if (session) {
        setAuth({
          isAuthenticated: true,
          role: session.role,
          username: session.username,
        });
        setSession(session);
      } else {
        throw new Error("Invalid session data");
      }
    } catch (error) {
      console.error("Failed to fetch session:", error);
      await AsyncStorage.removeItem("token");
      setAuth({ isAuthenticated: false });
      setSession(null);
      setError("Session fetch failed. Please log in again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Login user and fetch session details
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await Auth.login(
        credentials.username,
        credentials.password,
        credentials.role
      );

      if (response.token) {
        await AsyncStorage.setItem("token", response.token);
        await fetchSession(); // Ensure session is fetched

        return response; // ✅ Fix: Return the response
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      console.error("❌ Login failed in AuthContext:", error);
      setError("Login failed. Please try again.");
      throw error; // ✅ Fix: Throw the error so AuthScreen can handle it
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user and clear session/token
  const logout = async () => {
    try {
      await Auth.logout();
      await AsyncStorage.removeItem("token");
      setAuth({ isAuthenticated: false });
      setSession(null);
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Logout failed. Please try again.");
    }
  };

  // Auto-fetch session when the component mounts
  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        session,
        isLoading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
