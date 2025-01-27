import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useAppContext } from "../contexts/app/AppContext";

const MyLibraryScreen = () => {
  const [filter, setFilter] = useState("all");

  // Destructure data from useAppContext
  const { session, user, userProgress } = useAppContext();

  const bookmarksIds = userProgress?.BookmarksIds || [];
  const currentCoursesIds = userProgress?.currentCoursesIds || [];
  const completedCoursesIds = userProgress?.completedCoursesIds || [];
  const completedProjectsIds = userProgress?.completedProjectsIds || [];

  // Separate courses and projects from bookmarksIds
  const bookmarkedCourses = bookmarksIds.filter(
    (item) => item.type === "course"
  );
  const bookmarkedProjects = bookmarksIds.filter(
    (item) => item.type === "project"
  );

  // Filter options for display
  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Bookmarks", value: "bookmarks" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
  ];

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Filter Bar */}
      <View style={styles.filterBar}>
        {filterOptions.map((option) => (
          <TouchableOpacity
            key={option.value} // Ensure unique keys
            style={[
              styles.filterButton,
              filter === option.value && styles.activeFilterButton,
            ]}
            onPress={() => handleFilterChange(option.value)}
          >
            <Text
              style={[
                styles.filterText,
                filter === option.value && styles.activeFilterText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bookmarks Section */}
      {(filter === "all" || filter === "bookmarks") &&
        (bookmarkedCourses.length > 0 || bookmarkedProjects.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bookmarks</Text>
            {bookmarkedCourses.map((item) => (
              <View key={`course-${item.id}`} style={styles.card}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
            ))}
            {bookmarkedProjects.map((item) => (
              <View key={`project-${item.id}`} style={styles.card}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
            ))}
          </View>
        )}

      {/* In Progress Section */}
      {(filter === "all" || filter === "in-progress") &&
        currentCoursesIds.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>In Progress</Text>
            {currentCoursesIds.map((item, index) => (
              <View key={`progress-${index}`} style={styles.card}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
            ))}
          </View>
        )}

      {/* Completed Section */}
      {(filter === "all" || filter === "completed") &&
        (completedCoursesIds.length > 0 || completedProjectsIds.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Completed</Text>
            {completedCoursesIds.map((item, index) => (
              <View key={`completed-course-${index}`} style={styles.card}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
            ))}
            {completedProjectsIds.map((item, index) => (
              <View key={`completed-project-${index}`} style={styles.card}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
            ))}
          </View>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  activeFilterButton: {
    backgroundColor: "#007BFF",
  },
  filterText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  activeFilterText: {
    color: "#fff",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MyLibraryScreen;
