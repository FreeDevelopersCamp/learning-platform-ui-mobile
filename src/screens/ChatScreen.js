import React, { useMemo, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import { useAppContext } from "../contexts/app/AppContext";
import { useListUser } from "../hooks/user/useListUser";
import ChatSidebar from "./ChatSidebar";

const ChatScreen = () => {
  const navigation = useNavigation();
  const { session, user: currentUser } = useAppContext(); // ✅ Get current user session

  // ✅ Fetch users, session, and active sessions
  const {
    users,
    sessions,
    isLoading,
    error,
    refetch: refetchUsers, // ✅ Manual refresh function for users
  } = useListUser();

  // ✅ Ensure session is valid
  useEffect(() => {
    if (!session) {
      console.warn("⚠️ No valid session found.");
    }
  }, [session]);

  // ✅ Handle user selection and navigate to ChatContainer
  const handleUserSelect = (user) => {
    if (!currentUser) {
      console.error("❌ Current user not found. Cannot navigate.");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Current user not found. Please log in again.",
        visibilityTime: 3000,
      });
      return;
    }

    navigation.navigate("Chatting", { selectedUser: user, currentUser });
  };

  // ✅ Show loading screen while data is fetching
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4C9EEB" />
      </View>
    );
  }

  // ✅ Show error message if fetching users fails
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>⚠️ Failed to load users!</Text>
        <Button title="Retry" onPress={refetchUsers} color="#FF6347" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ChatSidebar
        users={users}
        onSelectUser={handleUserSelect}
        sessions={sessions}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
  },
});

export default ChatScreen;
