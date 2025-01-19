import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/HomeScreen/Header";
import Footer from "../components/HomeScreen/Footer";

const HomeLayout = ({ children }) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header atHome={true} />
        <View style={styles.content}>{children}</View>
      </SafeAreaView>
      {/* <Footer /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  content: {
    flex: 1,
  },
});

export default HomeLayout;
