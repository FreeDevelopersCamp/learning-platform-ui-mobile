import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { StatusBar } from "react-native";

import { AuthProvider } from "./contexts/auth/AuthContext";
import { UserSelectionProvider } from "./contexts/users/UserSelectionContext";

import { DarkModeProvider } from "./contexts/DarkModeContext";
import AppNavigator from "./navigation/AppNavigator";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserSelectionProvider>
          <NavigationContainer>
            <DarkModeProvider>
              {/* Set the status bar style */}
              <StatusBar barStyle="light-content" backgroundColor="#18212F" />
              <AppNavigator />
            </DarkModeProvider>
          </NavigationContainer>
          <Toast />
        </UserSelectionProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
