import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";

const CoursesSection = ({ userProgress }) => {
  // Extract the first 4 courses
  const courses = userProgress.currentCoursesIds.slice(0, 4);

  const renderCourseItem = ({ item }) => (
    <View style={styles.courseItem}>
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.courseProgress}>Progress: {item.progress}%</Text>
      <Button
        title="Continue"
        onPress={() => {
          /* Navigate to course */
        }}
      />
    </View>
  );

  const renderProjectItem = ({ item }) => (
    <View style={styles.projectItem}>
      <Text style={styles.projectTitle}>{item.title}</Text>
      <Button
        title="View Project"
        onPress={() => {
          /* Navigate to project */
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Courses</Text>
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  courseItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  courseProgress: {
    fontSize: 14,
    color: "gray",
    marginBottom: 8,
  },
  projectItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CoursesSection;
