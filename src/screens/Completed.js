import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CourseFetcher from "./CourseFetcher";
import ProjectFetcher from "./ProjectFetcher";

const Completed = ({ courses, projects }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>✅ Completed</Text>
      {courses.map((course) => (
        <CourseFetcher key={course} id={course} />
      ))}
      {projects.map((project) => (
        <ProjectFetcher key={project.itemId} id={project.itemId} />
      ))}
    </View>
  );
};

export default Completed;

const styles = StyleSheet.create({
  section: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});
