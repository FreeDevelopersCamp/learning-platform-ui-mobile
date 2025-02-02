import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";

import { useFetchCourseById } from "../hooks/courses/useCourse";
import { useUpdateProgress } from "../hooks/progress/useProgress";

import Resources from "./Resources";
import Exercises from "./Exercises";

const ViewCourse = ({ order, userProgress }) => {
  const {
    data: course,
    isLoading: isCourseLoading,
    courseError,
  } = useFetchCourseById(order.id);

  const { mutate: updateProgress, isLoading: updatingProgress } =
    useUpdateProgress();

  useEffect(() => {
    if (course && userProgress) {
      // Save course if it's not already saved in completedCoursesIds
      if (!userProgress.completedCoursesIds.includes(course._id)) {
        const updatedProgress = {
          _id: userProgress._id,
          userId: userProgress.user?._id,
          completedCoursesIds: [
            ...new Set([...userProgress.completedCoursesIds, course._id]),
          ],
        };

        updateProgress(updatedProgress);
      }
    }
  }, [course, userProgress]);

  if (isCourseLoading || updatingProgress) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#075eec" />
      </View>
    );
  }

  if (!course || courseError) {
    return <Text>Error loading course.</Text>;
  }

  const { name, description, resources = [], status, exercises } = course;

  const typeLabels = {
    0: "Article",
    1: "Video",
    2: "Course",
    3: "Feed",
    4: "Roadmap",
    5: "Official",
    6: "OpenSource",
  };

  const groupedResources = resources.reduce((acc, resource) => {
    const type = typeLabels[resource.type] || "Unknown";
    if (!acc[type]) acc[type] = [];
    acc[type].push(resource);
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{name}</Text>

      {status === "0" && <Text style={styles.description}>{description}</Text>}

      {Object.entries(groupedResources).map(([type, resources]) => (
        <View key={type}>
          <Text style={styles.sectionTitle}>{type}</Text>
          {resources.map((resource, idx) => (
            <View key={idx} style={styles.resourceItem}>
              {status === "0" ? (
                <View>
                  <Text style={styles.resourceName}>{resource.name}</Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(resource.url)}
                    style={styles.resourceLink}
                  >
                    <Text style={styles.resourceLinkText}>Open Resource</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Resources resource={resource} typeLabels={typeLabels} />
              )}
            </View>
          ))}
        </View>
      ))}

      {status === "1" && <Text style={styles.description}>{description}</Text>}

      <Exercises exercises={exercises} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 8,
  },
  resourceItem: {
    marginBottom: 16,
  },
  resourceName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resourceLink: {
    marginTop: 8,
  },
  resourceLinkText: {
    color: "#075eec",
    textDecorationLine: "underline",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ViewCourse;
