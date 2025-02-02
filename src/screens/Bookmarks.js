import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RoadmapFetcher from "./RoadmapFetcher";
import CourseFetcher from "./CourseFetcher";
import ProjectFetcher from "./ProjectFetcher";

const Bookmarks = ({ roadmaps, courses, projects }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📌 Bookmarks</Text>
      {roadmaps.map((roadmap) => (
        <RoadmapFetcher key={roadmap.itemId} id={roadmap.itemId} />
      ))}
      {courses.map((course) => (
        <CourseFetcher key={course.itemId} id={course.itemId} />
      ))}
      {projects.map((project) => (
        <ProjectFetcher key={project.itemId} id={project.itemId} />
      ))}
    </View>
  );
};

export default Bookmarks;

const styles = StyleSheet.create({
  section: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});
