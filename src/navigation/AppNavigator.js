import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthScreen from "../screens/AuthScreen";
import DrawerNavigator from "../components/DrawerNavigator";
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
      {/* Drawer Navigator */}
      <Stack.Screen
        name="Dashboard"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      {/* Roadmap Details Screen */}
      <Stack.Screen
        name="RoadmapDetails"
        component={RoadmapDetailsScreen}
        options={{ headerShown: true, title: "Roadmap Details" }}
      />

      <Stack.Screen
        name="ViewCourseOutlineScreen"
        component={ViewCourseOutlineScreen}
        options={{ headerShown: true, title: "Course Outline " }}
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
