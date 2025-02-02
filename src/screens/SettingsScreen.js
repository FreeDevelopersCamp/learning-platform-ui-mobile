import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useAppContext } from "../contexts/app/AppContext";

const SettingsScreen = () => {
  const { session, user } = useAppContext();

  console.log("session: ", session);
  console.log("user: ", user);

  if (!user) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  const handleUpdateProfile = () => {
    Alert.alert("Update Profile", "Feature coming soon!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Image & Username */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: user.image || "https://randomuser.me/api/portraits/men/1.jpg",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{user.userName || "Unknown User"}</Text>
      </View>

      {/* Personal Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{session.username || "Not provided"}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Password:</Text>
        <Text style={styles.value}>********</Text>
        {/* Masked for security reasons */}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>
          {user.personalInformation?.name?.first || ""}{" "}
          {user.personalInformation?.name?.second || ""}{" "}
          {user.personalInformation?.name?.third || ""}{" "}
          {user.personalInformation?.name?.last || ""}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>
          {user.contacts?.email || "Not provided"}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>
          {user.contacts?.mobile?.mobile || "Not provided"}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>State:</Text>
        <Text style={styles.value}>{user?.state || "Not provided"}</Text>
      </View>

      {/* Update Profile Button */}
      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdateProfile}
      >
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f9fc",
    padding: 20,
    alignItems: "center",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  infoContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    fontSize: 16,
    color: "#222",
  },
  updateButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
