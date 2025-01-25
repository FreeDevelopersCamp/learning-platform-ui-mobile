// screens/DashboardScreen.js
import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";

import { useAppContext } from "../contexts/app/AppContext";

import Statistics from "../components/Statistics";
import MainSection from "../components/MainSection";
import CoursesSection from "../components/CoursesSection";

const DashboardScreen = () => {
  const { session, user, userProgress } = useAppContext();

  return (
    <ScrollView style={styles.container}>
      <Text
        style={styles.welcomeText}
      >{`Welcome back, ${user.userName}👋`}</Text>
      <Statistics userProgress={userProgress} />
      <MainSection userProgress={userProgress} />

      <CoursesSection userProgress={userProgress} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default DashboardScreen;
