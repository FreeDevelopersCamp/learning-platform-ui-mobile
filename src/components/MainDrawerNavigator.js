import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import { Alert, StyleSheet } from "react-native";

import { useAuth } from "../contexts/auth/AuthContext";

import HomeLayout from "../layouts/HomeLayout";
import MainScreen from "../screens/MainScreen";
import UserTableScreen from "../screens/UserTableScreen";
import PermissionsScreen from "../screens/PermissionsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChatScreen from "../screens/ChatScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Drawer = createDrawerNavigator();

// Wrapper to include AppLayout for all screens
const withHomeLayout = (Component) => {
  return (props) => (
    <HomeLayout>
      <Component {...props} />
    </HomeLayout>
  );
};

// ✅ Fixed Custom Drawer Content Component
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
      <DrawerItem
        label="Dashboard"
        onPress={() => props.navigation.navigate("MainDashboard")}
        icon={({ color, size }) => (
          <Icon name="grid-outline" size={size} color={color} />
        )}
      />
      <DrawerItem
        label="Users"
        onPress={() => props.navigation.navigate("UsersTable")}
        icon={({ color, size }) => (
          <Icon name="person-outline" size={size} color={color} />
        )}
      />
      <DrawerItem
        label="Permissions"
        onPress={() => props.navigation.navigate("Permissions")}
        icon={({ color, size }) => (
          <Icon name="book-outline" size={size} color={color} />
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
        label="Settings"
        onPress={() => props.navigation.navigate("Settings")}
        icon={({ color, size }) => (
          <Icon name="settings-outline" size={size} color={color} />
        )}
      />
      <DrawerItem
        label="Log Out"
        onPress={handleLogout}
        icon={({ color, size }) => (
          <Icon name="log-out-outline" size={size} color="#fff" />
        )}
        style={styles.logoutButton} // Apply custom style
        labelStyle={styles.logoutLabel} // Apply label style
      />
    </DrawerContentScrollView>
  );
};

// ✅ Fixed Drawer Navigator
const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="MainDashboard"
        component={withHomeLayout(MainScreen)}
      />
      <Drawer.Screen
        name="UsersTable"
        component={withHomeLayout(UserTableScreen)}
      />
      <Drawer.Screen
        name="Permissions"
        component={withHomeLayout(PermissionsScreen)}
      />
      <Drawer.Screen name="Profile" component={withHomeLayout(ProfileScreen)} />
      <Drawer.Screen name="Chat" component={withHomeLayout(ChatScreen)} />
      <Drawer.Screen
        name="Notifications"
        component={withHomeLayout(NotificationsScreen)}
      />
      <Drawer.Screen
        name="Settings"
        component={withHomeLayout(SettingsScreen)}
      />
    </Drawer.Navigator>
  );
};

// ✅ Fixed Styles
const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "red",
    borderRadius: 8,
    marginHorizontal: 10,
  },
  logoutLabel: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MainDrawerNavigator;
