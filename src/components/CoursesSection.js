import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Platform,
} from "react-native";
import { ProgressBar } from "react-native-paper"; // Importing from react-native-paper

const CoursesSection = ({ userProgress }) => {
  // Extract the first 2 courses
  const courses = userProgress.currentCoursesIds.slice(0, 2);

  const renderCourseItem = ({ item }) => (
    <View key={item.id} style={styles.courseItem}>
      <Text style={styles.courseTitle}>Course</Text>
      <Text style={styles.courseTitle}>{item.title}</Text>

      {/* Progress Bar */}
      <ProgressBar
        progress={item.progress / 100} // Convert progress to decimal (0 to 1)
        color={"#03EF62"}
        style={styles.progressBar}
      />
      <Text style={styles.courseProgress}>{item.progress}% Complete</Text>

      <Button
        title="Continue"
        onPress={() => {
          /* Navigate to course */
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
        keyExtractor={(item) => item.id} // Ensuring unique keys
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
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginVertical: 8,
  },
  courseProgress: {
    fontSize: 14,
    color: "gray",
    marginBottom: 8,
  },
});

export default CoursesSection;
