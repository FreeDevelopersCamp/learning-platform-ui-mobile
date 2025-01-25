import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RoadmapsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Roadmaps Screen</Text>
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

export default RoadmapsScreen;
