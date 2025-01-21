import React, { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

import IntroductionSection from "../components/HomeScreen/IntroductionSection";
import EducationStats from "../components/HomeScreen/EducationStats";
import InstructorSection from "../components/HomeScreen/InstructorSection";

const HomeScreen = () => {
  useEffect(() => {
    Toast.show({
      type: "success",
      position: "top",
      text1: "Login Successful",
      text2: "Welcome back!",
    });
  }, []);

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
