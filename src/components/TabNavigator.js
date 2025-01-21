import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DashboardScreen from "../screens/DashboardScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ChatScreen from "../screens/ChatScreen";

// Layout Wrapper
import HomeLayout from "../layouts/HomeLayout";

const Tab = createBottomTabNavigator();

// Wrapper Components for Layout
const HomeWithLayout = () => (
  <HomeLayout atHome={true}>
    <HomeScreen />
  </HomeLayout>
);

const ProfileWithLayout = () => (
  <HomeLayout atHome={false}>
    <ProfileScreen />
  </HomeLayout>
);

const DashboardWithLayout = () => (
  <HomeLayout atHome={false}>
    <DashboardScreen />
  </HomeLayout>
);

const NotificationsWithLayout = () => (
  <HomeLayout atHome={false}>
    <NotificationsScreen />
  </HomeLayout>
);

const ChatWithLayout = () => (
  <HomeLayout atHome={false}>
    <ChatScreen />
  </HomeLayout>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Completely hides the default header
        tabBarStyle: {
          backgroundColor: "#f8f8f8",
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarActiveTintColor: "#4C9EEB",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Dashboard") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Notifications") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "Chat") {
            iconName = focused ? "chatbubble" : "chatbubble-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeWithLayout} />
      <Tab.Screen name="Profile" component={ProfileWithLayout} />
      <Tab.Screen name="Dashboard" component={DashboardWithLayout} />
      <Tab.Screen name="Notifications" component={NotificationsWithLayout} />
      <Tab.Screen name="Chat" component={ChatWithLayout} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
