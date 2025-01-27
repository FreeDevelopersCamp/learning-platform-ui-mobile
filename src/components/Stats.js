// Stats.js
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Stat from "./Stat";

const statsData = [
  {
    id: "1",
    title: "Hours Spent",
    data: formatDuration(userProgress.spentTime),
    bgColor: "#e0f7fa",
    iconName: "time-outline",
    iconColor: "#00796b",
    iconBgColor: "#b2dfdb",
  },
  {
    id: "2",
    title: "Projects Passed",
    data: userProgress.completedProjectsIds.length,
    bgColor: "#fce4ec",
    iconName: "git-branch-outline",
    iconColor: "#880e4f",
    iconBgColor: "#f8bbd0",
  },
  {
    id: "3",
    title: "Practices Completed",
    data: userProgress.completedPracticesIds.length,
    bgColor: "#ede7f6",
    iconName: "barbell-outline",
    iconColor: "#5e35b1",
    iconBgColor: "#d1c4e9",
  },
  {
    id: "4",
    title: "Courses Completed",
    data: userProgress.completedCoursesIds.length,
    bgColor: "#fff3e0",
    iconName: "school-outline",
    iconColor: "#e65100",
    iconBgColor: "#ffcc80",
  },
];

const Stats = ({ userProgress }) => {
  return (
    <FlatList
      data={statsData}
      renderItem={({ item }) => (
        <Stat
          title={item.title}
          data={item.data}
          bgColor={item.bgColor}
          iconName={item.iconName}
          iconColor={item.iconColor}
          iconBgColor={item.iconBgColor}
        />
      )}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.statsContainer}
    />
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    paddingVertical: 10,
  },
});

export default Stats;
