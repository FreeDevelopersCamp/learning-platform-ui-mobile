import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../contexts/auth/AuthContext";
import { useGetUser } from "../hooks/user/useGetUser";
import { useFetchProgressByUserId } from "../hooks/progress/useProgress";
import { useFetchRoadmapById } from "../hooks/roadmaps/useRoadmaps";

import ProgressBar from "../components/ProgressBar";
import OrderCard from "../components/OrderCard";
import InstructorsSet from "../components/InstructorsSet";

const ViewRoadmapDetailsScreen = () => {
  const navigation = useNavigation();
  const [percentage, setPercentage] = useState(0);
  const [buttonText, setButtonText] = useState("Start");
  const route = useRoute();
  const { roadmapId } = route.params;

  const { isLoading: isSessionLoading, session } = useAuth();
  const { user, isLoading: userLoading } = useGetUser(
    session?.username,
    session?.token
  );
  const { data: userProgress, isLoading: userProgressLoading } =
    useFetchProgressByUserId(user?._id);

  const {
    data: roadmap,
    isLoading: roadmapLoading,
    error: roadmapError,
  } = useFetchRoadmapById(roadmapId);

  const isLoading =
    isSessionLoading || userLoading || userProgressLoading || roadmapLoading;

  // Extract progress and determine button text
  useEffect(() => {
    if (userProgress) {
      const isCompleted =
        userProgress.completedRoadmapsIds?.includes(roadmapId);
      const currentRoadmap = userProgress.currentRoadmapsIds?.find(
        (roadmapProgress) => roadmapProgress.itemId === roadmapId
      );

      if (isCompleted) {
        setButtonText("Completed");
        setPercentage(100);
      } else if (currentRoadmap) {
        setButtonText("Continue");
        setPercentage(currentRoadmap.progress || 0);
      } else {
        setButtonText("Start");
        setPercentage(0);
      }
    }
  }, [userProgress, roadmapId]);

  const handleButtonPress = () => {
    if (buttonText === "Start") {
      navigation.navigate("ViewCourseOutlineScreen", {
        roadmap: roadmap,
        userProgress: userProgress,
      });
      return;
    } else if (buttonText === "Continue") {
      navigation.navigate("ViewCourseOutlineScreen", {
        roadmap: roadmap,
        userProgress: userProgress,
      });
      return;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#075eec" />
      </View>
    );
  }

  if (!roadmap || roadmapError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Failed to load roadmap details. Please try again later.
        </Text>
      </View>
    );
  }

  const orderCards = roadmap.order
    .filter((item) => item && !roadmap.practicesIds.includes(item._id)) // Skip practices
    .map((item) => {
      const type = roadmap.coursesIds.includes(item._id)
        ? "course"
        : roadmap.projectsIds.includes(item._id)
        ? "project"
        : "participant";

      const isCompleted =
        (type === "course" &&
          userProgress.completedCoursesIds?.includes(item._id)) ||
        (type === "project" &&
          userProgress.completedProjectsIds?.includes(item._id));

      const isSubmitted =
        type === "project" &&
        userProgress.currentProjectsIds?.includes(item._id);

      return {
        id: item._id,
        type,
        name: item.name,
        description: item.description,
        duration: item.duration,
        xp: item.xp,
        isCompleted,
        isSubmitted,
      };
    });

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{roadmap.name || "No Title"}</Text>
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
            <View style={styles.progressContainer}>
              <ProgressBar percentage={percentage} />
            </View>
          </View>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {roadmap.description || "No description available."}
          </Text>
        </>
      }
      data={orderCards}
      renderItem={({ item, index }) => (
        <OrderCard
          index={index + 1}
          type={item.type}
          name={item.name}
          description={item.description}
          duration={item.duration}
          xp={item.xp}
          isCompleted={item.isCompleted}
          isSubmitted={item.isSubmitted}
          roadmap={roadmap}
          userProgress={userProgress}
        />
      )}
      keyExtractor={(item) => item.id || index.toString()}
      ListFooterComponent={
        <View>
          <InstructorsSet instructor={roadmap.instructor} />
        </View>
      }
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#FF0000",
    textAlign: "center",
  },
  headerContainer: {
    backgroundColor: "#18212F",
    padding: 20,
    borderRadius: 8,
    margin: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  progressContainer: {
    borderRadius: 8,
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    paddingHorizontal: 15,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
    paddingHorizontal: 15,
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default ViewRoadmapDetailsScreen;
