import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

const ProgressBar = ({ progress = 0 }) => {
  return (
    <View style={styles.container}>
      <Progress.Bar progress={progress} width={200} color="#03EF62" />
      <Text style={styles.label}>{`${Math.round(progress * 100)}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
});

export default ProgressBar;
