import React, { createContext, useContext, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import { Auth } from "../../apis/auth/Auth";
import { navigationRef } from "../../utils/navigationRef";

// Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
    username: null,
  });
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const queryClient = useQueryClient();

  // Fetch Session
  const fetchSession = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      setAuth({ isAuthenticated: false, role: null, username: null });
      setSession(null);
      setIsLoading(false);
      return;
    }

    try {
      const fetchedSession = await new Auth().getSession();
      setAuth({
        isAuthenticated: true,
        role: fetchedSession.role,
        username: fetchedSession.username,
      });
      setSession(fetchedSession);
    } catch (err) {
      await AsyncStorage.removeItem("token");
      setAuth({ isAuthenticated: false, role: null, username: null });
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login
  const login = async ({ username, password, role }) => {
    console.log("username: ", username);
    console.log("password: ", password);
    console.log("role: ", role);
    setIsLoading(true);
    try {
      const response = await new Auth().login({
        userName: username,
        password,
        role,
      });
      console.log("response.token: ", response.token);

      if (response.token) {
        await AsyncStorage.setItem("token", response.token);
        setAuth({ isAuthenticated: true, role, username });
        Toast.show({
          type: "success",
          text1: "Login successful!",
        });

        navigationRef.current?.navigate("Home"); // Use navigationRef
        await fetchSession();
      } else {
        throw new Error("No token received");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to login";
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
      navigationRef.current?.navigate("Login"); // Use navigationRef
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        await new Auth().logout();
      }

      queryClient.clear();
      await AsyncStorage.removeItem("token");
      setAuth({ isAuthenticated: false, role: null, username: null });
      setSession(null);
      Toast.show({
        type: "success",
        text1: "You have successfully logged out.",
      });
      navigationRef.current?.navigate("Home"); // Use navigationRef
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Logout failed. Please try again.",
      });
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        session,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for simplicity
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider };
