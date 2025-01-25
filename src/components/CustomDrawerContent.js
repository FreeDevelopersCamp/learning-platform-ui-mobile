import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import { Alert, StyleSheet } from "react-native";
import { useAuth } from "../contexts/auth/AuthContext";

const CustomDrawerContent = (props) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          await logout();
          props.navigation.reset({
            index: 0,
            routes: [{ name: "Auth" }],
          });
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate("Home")}
        icon={({ color, size }) => (
          <Icon name="home-outline" size={size} color={color} />
        )}
      />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate("Profile")}
        icon={({ color, size }) => (
          <Icon name="person-outline" size={size} color={color} />
        )}
      />
      <DrawerItem
        label="Dashboard"
        onPress={() => props.navigation.navigate("Dashboard")}
        icon={({ color, size }) => (
          <Icon name="grid-outline" size={size} color={color} />
        )}
      />
      <DrawerItem
        label="Notifications"
        onPress={() => props.navigation.navigate("Notifications")}
        icon={({ color, size }) => (
          <Icon name="notifications-outline" size={size} color={color} />
        )}
      />
      <DrawerItem
        label="Chat"
        onPress={() => props.navigation.navigate("Chat")}
        icon={({ color, size }) => (
          <Icon name="chatbubble-outline" size={size} color={color} />
        )}
      />
      <DrawerItem
        label="Log Out"
        onPress={handleLogout}
        icon={({ color, size }) => (
          <Icon name="log-out-outline" size={size} color={color} />
        )}
        style={styles.logoutItem}
        labelStyle={styles.logoutLabel}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  logoutItem: {
    backgroundColor: "#ff4d4d",
    borderRadius: 5,
    marginVertical: 5,
  },
  logoutLabel: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CustomDrawerContent;
