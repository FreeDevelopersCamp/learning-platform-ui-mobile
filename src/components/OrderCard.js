import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { useUpdateProgress } from "../hooks/progress/useProgress";
import { formatDuration } from "../utils/helpers";

const OrderCard = ({
  index,
  type,
  name,
  description,
  duration,
  xp,
  isCompleted,
  isSubmitted,
  orderId,
  roadmap,
  userProgress,
}) => {
  const navigation = useNavigation();
  const { mutate: updateProgress, isLoading: updatingProgress } =
    useUpdateProgress();

  const handleStartClick = () => {
    // Check if roadmapId exists in currentRoadmapsIds
    const exists = userProgress?.currentRoadmapsIds?.some(
      (item) => item.itemId === roadmap._id
    );

    if (!exists) {
      // Add the roadmapId to currentRoadmapsIds in progress
      const updatedProgress = {
        _id: userProgress._id,
        userId: userProgress.user._id,
        currentRoadmapsIds: [
          ...userProgress.currentRoadmapsIds,
          { itemId: roadmap._id, progress: 0 },
        ],
      };

      updateProgress(updatedProgress);
    }
    navigation.navigate("ViewCourseOutlineScreen", {
      roadmap: roadmap,
      userProgress: userProgress,
      orderId: orderId,
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.typeContainer}>
        <Text style={styles.typeText}>{type.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>{`${index}. ${name}`}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.detailsContainer}>
        {duration > 0 && (
          <View style={styles.details}>
            <Icon name="time-outline" size={16} color="#555" />
            <Text style={styles.detailText}>{`${formatDuration(
              duration
            )} Hours`}</Text>
          </View>
        )}
        {xp > 0 && (
          <View style={styles.details}>
            <Icon name="star-outline" size={16} color="#4CAF50" />
            <Text style={styles.detailText}>{`${xp} XP`}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          isCompleted && styles.completedButton,
          isSubmitted && styles.submittedButton,
        ]}
        onPress={handleStartClick}
        disabled={isCompleted || isSubmitted || updatingProgress}
      >
        {updatingProgress ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text
            style={[
              styles.buttonText,
              isCompleted && styles.completedButtonText,
              isSubmitted && styles.submittedButtonText,
            ]}
          >
            {isCompleted ? "Completed" : isSubmitted ? "Submitted" : "Start"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  typeContainer: {
    paddingVertical: 4,
    alignSelf: "flex-start",
    borderRadius: 4,
    marginBottom: 8,
  },
  typeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 4,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  completedButton: {
    backgroundColor: "#ccc",
  },
  completedButtonText: {
    color: "#666",
  },
  submittedButton: {
    backgroundColor: "#FFD700",
  },
  submittedButtonText: {
    color: "#333",
  },
});

export default OrderCard;
