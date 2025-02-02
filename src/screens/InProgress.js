import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RoadmapFetcher from "./RoadmapFetcher";
import CourseFetcher from "./CourseFetcher";
import ProjectFetcher from "./ProjectFetcher";

const InProgress = ({ roadmaps, courses, projects }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🚀 In Progress</Text>
      {roadmaps.map((roadmap) => (
        <RoadmapFetcher key={roadmap.itemId} id={roadmap.itemId} />
      ))}
      {courses.map((course) => (
        <CourseFetcher key={course} id={course} />
      ))}
      {projects.map((project) => (
        <ProjectFetcher key={project.id} id={project.id} />
      ))}
    </View>
  );
};

export default InProgress;

const styles = StyleSheet.create({
  section: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});
