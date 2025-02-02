import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useAppContext } from "../contexts/app/AppContext";

import Bookmarks from "./Bookmarks";
import InProgress from "./InProgress";
import Completed from "./Completed";

const MyLibraryScreen = () => {
  const [filter, setFilter] = useState("all");
  const { userProgress } = useAppContext();

  // Extract user progress data
  const bookmarksIds = userProgress?.BookmarksIds || [];
  const currentRoadmapsIds = userProgress?.currentRoadmapsIds || [];
  const currentCoursesIds = userProgress?.currentCoursesIds || [];
  const currentProjectsIds = userProgress?.currentProjectsIds || [];
  const completedCoursesIds = userProgress?.completedCoursesIds || [];
  const completedProjectsIds = userProgress?.completedProjectsIds || [];

  // Separate roadmaps, courses, and projects from bookmarks
  const bookmarkedRoadmaps = bookmarksIds.filter(
    (item) => item.type === "roadmap"
  );
  const bookmarkedCourses = bookmarksIds.filter(
    (item) => item.type === "course"
  );
  const bookmarkedProjects = bookmarksIds.filter(
    (item) => item.type === "project"
  );

  return (
    <View style={styles.container}>
      <FilterBar activeFilter={filter} onFilterChange={setFilter} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {(filter === "all" || filter === "bookmarks") && (
          <Bookmarks
            roadmaps={bookmarkedRoadmaps}
            courses={bookmarkedCourses}
            projects={bookmarkedProjects}
          />
        )}
        {(filter === "all" || filter === "in-progress") && (
          <InProgress
            roadmaps={currentRoadmapsIds}
            courses={currentCoursesIds}
            projects={currentProjectsIds}
          />
        )}
        {(filter === "all" || filter === "completed") && (
          <Completed
            courses={completedCoursesIds}
            projects={completedProjectsIds}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default MyLibraryScreen;

// ✅ FilterBar Component
const FilterBar = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { label: "All", value: "all" },
    { label: "Bookmarks", value: "bookmarks" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <View style={styles.filterBar}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.value}
          style={[
            styles.filterButton,
            activeFilter === filter.value && styles.activeFilterButton,
          ]}
          onPress={() => onFilterChange(filter.value)}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === filter.value && styles.activeFilterText,
            ]}
          >
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { padding: 16 },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  activeFilterButton: { backgroundColor: "#007BFF" },
  filterText: { fontSize: 12, fontWeight: "bold", color: "#333" },
  activeFilterText: { color: "#fff" },
});
