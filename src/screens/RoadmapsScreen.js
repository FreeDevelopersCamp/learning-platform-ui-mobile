import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import Icon from react-native-vector-icons

import { useAppContext } from "../contexts/app/AppContext";
import { useFetchRoadmapList } from "../hooks/roadmaps/useRoadmaps";
import RoadmapCard from "../components/RoadmapCard";

const RoadmapsScreen = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredRoadmaps, setFilteredRoadmaps] = useState([]); // State for filtered roadmaps

  const { userProgress } = useAppContext();
  const { data: allRoadmaps, isLoading, isError } = useFetchRoadmapList();

  useEffect(() => {
    if (!allRoadmaps?.items) return;

    const filtered = Object.values(allRoadmaps.items).filter((roadmap) => {
      return (
        roadmap.topic?.toLowerCase().includes(searchQuery.toLowerCase()) || // Search in the topic
        roadmap.description?.toLowerCase().includes(searchQuery.toLowerCase()) // Search in the description
      );
    });

    setFilteredRoadmaps(filtered);
  }, [searchQuery, allRoadmaps]); // Recalculate filtered roadmaps on search query change

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4C9EEB" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>
          Failed to load roadmaps. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Roadmaps</Text>
        <Text style={styles.subtitle}>
          Our career tracks are hand-picked by industry experts. You will learn
          all you need to start a new career in the data science field.
        </Text>
      </View>

      {/* Search Bar with Icon */}
      <View style={styles.searchBarContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search roadmaps..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.total}>
        <Text>
          {filteredRoadmaps.length} Roadmap
          {filteredRoadmaps.length !== 1 ? "s" : ""}
        </Text>
      </View>

      <View style={styles.roadmapsContainer}>
        {filteredRoadmaps.map((roadmap, index) => (
          <RoadmapCard
            key={roadmap._id || `${roadmap.topic}-${index}`}
            roadmap={roadmap}
            userProgress={userProgress}
            onContinue={() => console.log("Continue pressed for", roadmap._id)}
            onViewDetails={() =>
              console.log("View details pressed for", roadmap._id)
            }
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#FF0000",
  },
  heading: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
  },
  subtitle: {
    fontSize: 14,
    color: "#444",
    marginTop: 8,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 10,
  },
  total: {
    marginBottom: 16,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  roadmapsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default RoadmapsScreen;
