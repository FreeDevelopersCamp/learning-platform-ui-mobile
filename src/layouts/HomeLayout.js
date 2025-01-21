import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import { useAuth } from "../contexts/auth/AuthContext";
import { useGetUser } from "../hooks/user/useGetUser";

import Header from "../components/HomeScreen/Header";

const HomeLayout = ({ children, atHome }) => {
  const { isLoading: isSessionLoading, session } = useAuth();
  const { user, isLoading: userLoading } = useGetUser(
    session?.username,
    session?.token
  );

  const isLoading = isSessionLoading || userLoading;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#075eec" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header atHome={atHome} />
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
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

export default HomeLayout;
