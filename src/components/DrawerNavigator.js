import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import { Alert, StyleSheet } from "react-native";

import { useAuth } from "../contexts/auth/AuthContext";

import AppLayout from "../layouts/AppLayout";
import DashboardScreen from "../screens/DashboardScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MyLibraryScreen from "../screens/MyLibraryScreen";
import RoadmapsScreen from "../screens/RoadmapsScreen";
import CoursesScreen from "../screens/CoursesScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import CertificationsScreen from "../screens/CertificationsScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Drawer = createDrawerNavigator();

// Wrapper to include AppLayout for all screens
const withAppLayout = (Component) => {
  return (props) => (
    <AppLayout>
      <Component {...props} />
    </AppLayout>
  );
};

// Custom Drawer Content Component
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
        onPress={() => props.navigation.navigate("Dashboard")}
        icon={({ color, size }) => (
          <Icon name="grid-outline" size={size} color={color} />
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
        label="My Library"
        onPress={() => props.navigation.navigate("My Library")}
        icon={({ color, size }) => (
          <Icon name="book-outline" size={size} color={color} />
        )}
      />
      {/* <DrawerItem
        label="Leaderboard"
        onPress={() => props.navigation.navigate("Leaderboard")}
        icon={({ color, size }) => (
          <Icon name="trophy-outline" size={size} color={color} />
        )}
      /> */}
      <DrawerItem
        label="Roadmaps"
        onPress={() => props.navigation.navigate("Roadmaps")}
        icon={({ color, size }) => (
          <Icon name="map-outline" size={size} color={color} />
        )}
      />
      <DrawerItem
        label="Courses"
        onPress={() => props.navigation.navigate("Courses")}
        icon={({ color, size }) => (
          <Icon name="school-outline" size={size} color={color} />
        )}
      />
      <DrawerItem
        label="Projects"
        onPress={() => props.navigation.navigate("Projects")}
        icon={({ color, size }) => (
          <Icon name="briefcase-outline" size={size} color={color} />
        )}
      />
      <DrawerItem
        label="Certifications"
        onPress={() => props.navigation.navigate("Certifications")}
        icon={({ color, size }) => (
          <Icon name="ribbon-outline" size={size} color={color} />
        )}
      />
      {/* New Settings Item */}
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

// Drawer Navigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={withAppLayout(DashboardScreen)}
      />
      <Drawer.Screen
        name="Notifications"
        component={withAppLayout(NotificationsScreen)}
      />
      <Drawer.Screen name="Chat" component={withAppLayout(ChatScreen)} />
      <Drawer.Screen name="Profile" component={withAppLayout(ProfileScreen)} />
      <Drawer.Screen
        name="My Library"
        component={withAppLayout(MyLibraryScreen)}
      />
      {/* <Drawer.Screen
        name="Leaderboard"
        component={withAppLayout(LeaderboardScreen)}
      /> */}
      <Drawer.Screen
        name="Roadmaps"
        component={withAppLayout(RoadmapsScreen)}
      />
      <Drawer.Screen name="Courses" component={withAppLayout(CoursesScreen)} />
      <Drawer.Screen
        name="Projects"
        component={withAppLayout(ProjectsScreen)}
      />
      <Drawer.Screen
        name="Certifications"
        component={withAppLayout(CertificationsScreen)}
      />
      <Drawer.Screen
        name="Settings"
        component={withAppLayout(SettingsScreen)}
      />
    </Drawer.Navigator>
  );
};

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

export default DrawerNavigator;
