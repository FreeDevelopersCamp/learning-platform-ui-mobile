import React from "react";
import { Text, ActivityIndicator, StyleSheet } from "react-native";
import { useFetchRoadmapById } from "../hooks/roadmaps/useRoadmaps";
import RoadmapCard from "../components/RoadmapCard";

const RoadmapFetcher = ({ id, userProgress }) => {
  const { data: roadmap, isLoading, error } = useFetchRoadmapById(id);

  if (isLoading) return <ActivityIndicator size="large" color="#007BFF" />;
  if (error) return <Text style={styles.error}>Error loading roadmap.</Text>;
  if (!roadmap) return null;

  return <RoadmapCard roadmap={roadmap} userProgress={userProgress} />;
};

export default RoadmapFetcher;

const styles = StyleSheet.create({
  error: { color: "red", textAlign: "center" },
});
