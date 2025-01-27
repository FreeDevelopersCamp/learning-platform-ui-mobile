import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "../../apis/auth/Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false });
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch session details and set the authentication state
  const fetchSession = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      const session = await Auth.getSession();
      if (session) {
        setAuth({ isAuthenticated: true, username: session.username });
        setSession({ ...session, token }); // Ensure token is part of the session
      } else {
        throw new Error("Invalid session data");
      }
    } catch (error) {
      console.error("Failed to fetch session:", error);
      await AsyncStorage.removeItem("token");
      setAuth({ isAuthenticated: false });
      setSession(null);
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
      await AsyncStorage.setItem("token", response.token);
      await fetchSession(); // Fetch the session after login
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Rethrow the error for the caller to handle
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
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
