import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MyLibraryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MyLibrary Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyLibraryScreen;
