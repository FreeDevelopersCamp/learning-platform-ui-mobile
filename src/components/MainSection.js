import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useFetchRoadmapById } from "../hooks/roadmaps/useRoadmaps";

import Progress from "../components/Progress";
import Review from "../components/Review";
import { formatDuration } from "../utils/helpers";

const MainSection = ({ userProgress }) => {
  const navigation = useNavigation();
  const roadmapId = userProgress?.currentRoadmapsIds?.[0]?.itemId;
  const progress = userProgress?.currentRoadmapsIds?.[0]?.progress;

  const { data: roadmap, isLoading: isLoadingRoadmap } =
    useFetchRoadmapById(roadmapId);

  if (isLoadingRoadmap) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4C9EEB" />
      </View>
    );
  }

  if (!roadmap || !roadmap.order) {
    return (
      <View style={styles.errorContainer}>
        <Text>No roadmap data available.</Text>
      </View>
    );
  }

  const currentCourse = roadmap.order.find(
    (course) =>
      userProgress?.completedCoursesIds &&
      !userProgress.completedCoursesIds.includes(course._id)
  );

  const totalTimeLeft = roadmap.order.reduce((acc, course) => {
    if (!userProgress?.completedCoursesIds?.includes(course._id)) {
      return acc + (course.duration || 0);
    }
    return acc;
  }, 0);

  const handleContinue = () => {
    const nextCourse = roadmap.order.find(
      (course) =>
        userProgress?.completedCoursesIds &&
        !userProgress.completedCoursesIds.includes(course._id)
    );

    if (nextCourse) {
      navigation.navigate("CourseDetailsScreen", {
        roadmapTopic: roadmap.topic,
        roadmapId,
        courseTitle: nextCourse.name,
        courseId: nextCourse._id,
      });
    } else {
      navigation.navigate("RoadmapOverviewScreen", { roadmapId });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.trackInfo}>
        <Text style={styles.trackText}>
          You’re enrolled in the <Text style={styles.bold}>{roadmap.name}</Text>{" "}
          roadmap.
        </Text>
        <Text style={styles.courseName}>
          {currentCourse
            ? currentCourse.name
            : "You have completed all courses!"}
        </Text>
        <View style={styles.progressSection}>
          <Progress progress={progress} width="50%" />
          <Text style={styles.timeLeft}>
            {`${formatDuration(totalTimeLeft)} Hours to go`}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>
            {currentCourse ? "Keep Making Progress" : "View Certificate"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f8ff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  trackInfo: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  trackText: {
    fontSize: 16,
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
  },
  courseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  progressSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  timeLeft: {
    marginLeft: 16,
    color: "#4C9EEB",
  },
  button: {
    backgroundColor: "#4C9EEB",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainSection;
