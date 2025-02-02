import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFetchProjectById } from "../hooks/projects/useProject";

const ProjectFetcher = ({ id, userProgress }) => {
  const { data: project, isLoading, error } = useFetchProjectById(id);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }
  if (error) {
    return <Text style={styles.errorText}>Error loading project.</Text>;
  }
  if (!project) {
    return <Text style={styles.emptyText}>Project not found.</Text>;
  }

  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.projectTitle}>{project.name}</Text>
      <Text style={styles.projectDescription}>
        {project.description || "No description available."}
      </Text>
      <View style={styles.statusContainer}>
        <Text
          style={[
            styles.statusText,
            userProgress?.completedProjectsIds?.includes(id) &&
              styles.completed,
          ]}
        >
          {userProgress?.completedProjectsIds?.includes(id)
            ? "Completed"
            : "In Progress"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProjectFetcher;

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
  emptyText: {
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
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
  projectTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  projectDescription: {
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
  completed: {
    color: "green",
  },
});
