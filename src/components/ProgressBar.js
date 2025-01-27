import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

const ProgressBar = ({ percentage }) => {
  return (
    <View style={styles.container}>
      <Progress.Bar progress={percentage / 100} width={282} color="#03EF62" />
      <Text style={styles.label}>{`${Math.round(percentage)}%`}</Text>
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
