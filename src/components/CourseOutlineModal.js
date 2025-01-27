import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ProgressCircle } from "react-native-svg-charts";

const CourseOutlineModal = ({
  isVisible,
  toggleModal,
  slideAnim,
  flatStructure,
  userProgress,
  roadmap,
  onSelectItem,
}) => {
  const [expandedCourse, setExpandedCourse] = useState(null);

  if (!isVisible) return null;

  const coursesIds = roadmap?.coursesIds || [];
  const projectsIds = roadmap?.projectsIds || [];
  const order = roadmap?.order || [];

  const calculateSubcourseProgress = (subCourses) => {
    const completedSubcourses = subCourses.filter(
      (subCourse) =>
        userProgress?.completedCoursesIds?.includes(subCourse._id) ||
        userProgress?.completedProjectsIds?.includes(subCourse._id)
    );
    return subCourses.length
      ? (completedSubcourses.length / subCourses.length) * 100
      : 0;
  };

  const renderSubcourses = (subCourses) => {
    return subCourses.map((subCourse) => {
      const isCompleted =
        userProgress?.completedCoursesIds?.includes(subCourse._id) ||
        userProgress?.completedProjectsIds?.includes(subCourse.id);

      return (
        <View key={subCourse.id} style={styles.subCourseItem}>
          <Icon
            name="checkmark-circle"
            size={20}
            color={isCompleted ? "#4CAF50" : "#ddd"}
          />
          <Text style={styles.subCourseText}>{subCourse.name}</Text>
        </View>
      );
    });
  };

  const renderCourseItem = ({ item }) => {
    const isProject = projectsIds.includes(item.id);
    const progress = isProject
      ? 0
      : calculateSubcourseProgress(item.subCourses);
    const isExpanded = expandedCourse === item.id;

    return (
      <View style={styles.courseItem}>
        <TouchableOpacity
          style={styles.courseHeader}
          onPress={(e) => {
            e.stopPropagation();
            onSelectItem(item); // Passing selected course or project
          }}
        >
          <View style={styles.progressCircleContainer}>
            {isProject ? (
              <View style={styles.projectContainer}>
                <Icon name="rocket" size={20} color="#075eec" marginLeft={3} />
                <Text style={styles.projectText}>Project</Text>
              </View>
            ) : (
              <ProgressCircle
                style={styles.progressCircle}
                progress={progress / 100}
                progressColor={"#4CAF50"}
                backgroundColor={"#ddd"}
              >
                <View style={styles.progressCircleTextWrapper}>
                  <Text style={styles.progressText}>
                    {Math.round(progress)}%
                  </Text>
                </View>
              </ProgressCircle>
            )}
          </View>
          <Text style={styles.courseTitle}>{item.name}</Text>

          {!isProject && (
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                setExpandedCourse(expandedCourse === item.id ? null : item.id);
              }}
            >
              <Icon
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        {isExpanded && !isProject && renderSubcourses(item.subCourses)}
      </View>
    );
  };

  const filteredCourses = flatStructure.filter((item) =>
    coursesIds.includes(item.id)
  );
  const filteredProjects = flatStructure.filter((item) =>
    projectsIds.includes(item.id)
  );
  const combinedItems = filteredCourses.concat(filteredProjects);

  const sortedItems = combinedItems.sort((a, b) => {
    const indexA = order.findIndex((course) => course._id === a.id);
    const indexB = order.findIndex((course) => course._id === b.id);
    return indexA - indexB;
  });

  return (
    <Animated.View
      style={[
        styles.modalContainer,
        { transform: [{ translateX: slideAnim }] },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.modalTitle}>Course Outline</Text>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            toggleModal();
          }}
          style={styles.closeButton}
        >
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortedItems}
        keyExtractor={(item) => item.id}
        renderItem={renderCourseItem}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "105%",
    width: "80%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  closeButton: {
    backgroundColor: "#eaeaea",
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  courseItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 8,
  },
  courseHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressCircleContainer: {
    marginRight: 5,
  },
  progressCircle: {
    height: 45,
    width: 45,
  },
  progressCircleTextWrapper: {
    position: "absolute",
    top: 10,
    left: 10,
    transform: [{ translateX: -10 }, { translateY: -10 }],
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
    marginHorizontal: 8,
  },
  subCourseItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginLeft: 32,
  },
  subCourseText: {
    fontSize: 14,
    marginLeft: 8,
  },
  projectContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
  projectText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#075eec",
    marginLeft: 5,
    marginBottom: 0,
  },
});

export default CourseOutlineModal;
