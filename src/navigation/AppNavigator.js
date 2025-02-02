import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthScreen from "../screens/AuthScreen";
import SignUpScreen from "../screens/SignUpScreen";

import DrawerNavigator from "../components/DrawerNavigator";
import MainDrawerNavigator from "../components/MainDrawerNavigator";

import RoadmapDetailsScreen from "../screens/RoadmapDetailsScreen";
import ViewCourseOutlineScreen from "../screens/ViewCourseOutlineScreen";
import ChatContainer from "../screens/ChatContainer";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Auth">
      {/* Authentication Screen */}
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false }}
      />

      {/* Sign Up Screen */}
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: true, title: "Sign Up" }}
      />

      {/* Role-Based Screens */}
      <Stack.Screen
        name="MainDashboard"
        component={MainDrawerNavigator}
        options={{ headerShown: false }}
      />

      {/* Learner Dashboard */}
      <Stack.Screen
        name="Dashboard"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />

      {/* Other Screens */}
      <Stack.Screen
        name="RoadmapDetails"
        component={RoadmapDetailsScreen}
        options={{ headerShown: true, title: "Roadmap Details" }}
      />
      <Stack.Screen
        name="ViewCourseOutlineScreen"
        component={ViewCourseOutlineScreen}
        options={{ headerShown: true, title: "Course Outline" }}
      />
      <Stack.Screen
        name="Chatting"
        component={ChatContainer}
        options={{
          headerShown: true,
          title: "Chatting",
          headerBackTitle: "Users",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
