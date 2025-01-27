import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Progress = ({ progress = 0, width = "100%" }) => {
  return (
    <View style={[styles.progressWrapper, { width }]}>
      <View style={styles.progressContainer}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressLabel}>{progress}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  progressContainer: {
    flex: 1,
    height: 10,
    backgroundColor: "#E5E7EB", // Light gray
    borderRadius: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#03EF62", // Light green
    transition: "width 0.3s ease-in-out", // Native doesn't use transition directly
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563", // Gray
  },
});

export default Progress;
