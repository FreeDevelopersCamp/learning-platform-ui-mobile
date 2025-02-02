import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const RoadmapCard = ({ roadmap, userProgress }) => {
  const navigation = useNavigation();

  const { _id, description, topic, coursesIds = [], order = [] } = roadmap;

  // Check user progress
  const progress =
    userProgress?.currentRoadmapsIds?.find((entry) => entry.itemId === _id)
      ?.progress || 0;

  const isCurrent = userProgress?.currentRoadmapsIds?.some(
    (entry) => entry.itemId === _id
  );

  const handleContinue = () => {
    navigation.navigate("ViewCourseOutlineScreen", {
      roadmap: roadmap,
      userProgress: userProgress,
    });
    return;
  };

  const handleViewDetails = () => {
    // Navigate to the RoadmapDetails screen
    navigation.navigate("RoadmapDetails", { roadmapId: _id });
  };

  return (
    <TouchableOpacity onPress={handleViewDetails} style={styles.card}>
      <Text style={styles.type}>ROADMAP</Text>
      <Text style={styles.topic}>{topic || "Roadmap Topic"}</Text>
      <Text style={styles.description}>
        {description || "No description available."}
      </Text>

      {/* Separator Line */}
      <View style={styles.separator} />

      <View style={styles.details}>
        {isCurrent && (
          <View style={styles.progressSection}>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        )}
        <TouchableOpacity
          style={[
            styles.button,
            isCurrent ? styles.activeButton : styles.detailsButton,
          ]}
          onPress={isCurrent ? handleContinue : handleViewDetails}
        >
          <Text style={styles.buttonText}>
            {isCurrent ? "Continue" : "View Details"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  type: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  topic: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginBottom: 16,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 16,
  },
  progressContainer: {
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 4,
    overflow: "hidden",
    flex: 1,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4caf50",
  },
  progressText: {
    fontSize: 12,
    color: "#555",
    marginLeft: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: "#4caf50",
  },
  detailsButton: {
    backgroundColor: "#007BFF",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RoadmapCard;
