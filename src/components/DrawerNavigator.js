// DrawerNavigator.js
import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import TabNavigator from "./TabNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ChatScreen from "../screens/ChatScreen";
import SettingsScreen from "../screens/SettingsScreen";

import { useAuth } from "../contexts/auth/AuthContext";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          await logout(); // Call logout function from AuthContext
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
      {/* Drawer Items */}
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate("Home")}
        icon={({ color, size }) => (
          <Icon name="home-outline" size={size} color={color} />
        )}
      />
      <DrawerItem
        label="My Profile"
        onPress={() => props.navigation.navigate("My Profile")}
        icon={({ color, size }) => (
          <Icon name="person-outline" size={size} color={color} />
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
        label="Account Settings"
        onPress={() => props.navigation.navigate("Account Settings")}
        icon={({ color, size }) => (
          <Icon name="settings-outline" size={size} color={color} />
        )}
      />

      {/* Logout Button */}
      <DrawerItem
        label="Log Out"
        onPress={handleLogout}
        icon={({ color, size }) => (
          <Icon name="log-out-outline" size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false, // Remove the default header
        drawerStyle: {
          backgroundColor: "#f8f8f8",
          width: 240,
        },
        drawerActiveTintColor: "#4C9EEB",
        drawerInactiveTintColor: "gray",
        drawerLabelStyle: {
          fontSize: 15,
        },
      }}
    >
      {/* Main Tabs */}
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="My Profile" component={ProfileScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="Chat" component={ChatScreen} />
      <Drawer.Screen name="Account Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
