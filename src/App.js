import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import { AuthProvider } from "./contexts/auth/AuthContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import AppNavigator from "./navigation/AppNavigator";
import { navigationRef } from "./utils/navigationRef";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <Toast />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer ref={navigationRef}>
          <AuthProvider>
            <DarkModeProvider>
              <AppNavigator />
            </DarkModeProvider>
          </AuthProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </>
  );
}
