import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFetchCourseById } from "../hooks/courses/useCourse";

const CourseFetcher = ({ id, userProgress }) => {
  const { data: course, isLoading } = useFetchCourseById(id);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!course) {
    return <Text style={styles.errorText}>Error loading course.</Text>;
  }

  let progressStatus = "start";

  if (userProgress?.currentCoursesIds?.some((item) => item.itemId === id)) {
    progressStatus = "inProgress";
  }
  if (userProgress?.completedCoursesIds?.includes(id)) {
    progressStatus = "completed";
  }

  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.courseTitle}>{course.name}</Text>
      <Text style={styles.courseDescription}>
        {course.description || "No description available."}
      </Text>

      <View style={styles.statusContainer}>
        <Text
          style={[
            styles.statusText,
            progressStatus === "inProgress" && styles.inProgress,
          ]}
        >
          {progressStatus === "inProgress"
            ? "In Progress"
            : progressStatus === "completed"
            ? "Completed"
            : "Not Started"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CourseFetcher;

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  statusContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#ddd",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
  },
  inProgress: {
    color: "#007BFF",
  },
});
