import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeLayout from "../layouts/HomeLayout";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

// Wrapper component for HomeScreen
const HomeWithLayout = () => (
  <HomeLayout>
    <HomeScreen />
  </HomeLayout>
);

// Wrapper component for ProfileScreen
const ProfileWithLayout = () => (
  <HomeLayout>
    <ProfileScreen />
  </HomeLayout>
);

// Wrapper component for SettingsScreen
const SettingsWithLayout = () => (
  <HomeLayout>
    <SettingsScreen />
  </HomeLayout>
);

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Login"
        component={AuthScreen}
        options={{ headerShown: false }} // Hide default header
      />
      <Stack.Screen
        name="Home"
        component={HomeWithLayout} // Pass the wrapper component
        options={{ headerShown: false }} // Hide default header
      />
      <Stack.Screen
        name="Profile"
        component={ProfileWithLayout} // Pass the wrapper component
        options={{ headerShown: false }} // Hide default header
      />
      <Stack.Screen
        name="Settings"
        component={SettingsWithLayout} // Pass the wrapper component
        options={{ headerShown: false }} // Hide default header
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
