import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../contexts/auth/AuthContext";
import { AppProvider } from "../contexts/app/AppContext";
import { useGetUser } from "../hooks/user/useGetUser";
import { useFetchProgressByUserId } from "../hooks/progress/useProgress";

import Header from "../components/HomeScreen/Header";
import TabNavigator from "../components/TabNavigator";

const AppLayout = ({ children }) => {
  const { isLoading: isSessionLoading, session } = useAuth();

  const { user, isLoading: userLoading } = useGetUser(
    session?.username,
    session?.token
  );

  const { data: userProgress, isLoading: userProgressLoading } =
    useFetchProgressByUserId(user?._id);

  const isLoading = isSessionLoading || userLoading || userProgressLoading;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#075eec" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppProvider value={{ session, user, userProgress }}>
        <Header />
        <View style={styles.content}>{children}</View>
        <TabNavigator />
      </AppProvider>
    </SafeAreaView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#18212F", // Match header background
  },
  content: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

export default AppLayout;
