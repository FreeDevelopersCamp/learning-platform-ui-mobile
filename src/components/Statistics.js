import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { formatDuration } from "../utils/helpers";

const Statistics = ({ userProgress }) => {
  if (!userProgress) {
    return null;
  }

  const stats = {
    hoursSpent: formatDuration(userProgress.spentTime || 0),
    projectsPassed: userProgress.completedProjectsIds.length || 0,
    practicesCompleted: userProgress.completedPracticesIds.length || 0,
    coursesCompleted: userProgress.completedCoursesIds.length || 0,
  };

  return (
    <View style={styles.card}>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.hoursSpent}</Text>
          <Text style={styles.statLabel}>Hours Spent</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.projectsPassed}</Text>
          <Text style={styles.statLabel}>Projects Passed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.coursesCompleted}</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f8ff",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 2,
    marginVertical: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4C9EE0",
  },
  statLabel: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
  },
});

export default Statistics;
