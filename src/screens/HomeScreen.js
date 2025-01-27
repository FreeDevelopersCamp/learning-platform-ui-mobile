import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import IntroductionSection from "../components/HomeScreen/IntroductionSection";
import EducationStats from "../components/HomeScreen/EducationStats";
import InstructorSection from "../components/HomeScreen/InstructorSection";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <IntroductionSection />
      <EducationStats />
      <InstructorSection />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
