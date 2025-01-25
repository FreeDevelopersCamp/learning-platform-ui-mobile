import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { StatusBar } from "react-native";

import { AuthProvider } from "./contexts/auth/AuthContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import AppNavigator from "./navigation/AppNavigator";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <DarkModeProvider>
            {/* Set the status bar style */}
            <StatusBar barStyle="dark-content" />
            <AppNavigator />
          </DarkModeProvider>
        </NavigationContainer>
        <Toast />
      </AuthProvider>
    </QueryClientProvider>
  );
}
