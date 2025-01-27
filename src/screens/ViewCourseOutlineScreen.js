import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Animated,
  FlatList,
  Text,
} from "react-native";

import TopBar from "../components/TopBar";
import CourseDetails from "../components/CourseDetails";
import CourseOutlineModal from "../components/CourseOutlineModal";

const ViewCourseOutlineScreen = ({ route, navigation }) => {
  const [flatStructure, setFlatStructure] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const slideAnim = useState(new Animated.Value(-300))[0];

  const { roadmap, userProgress, courseId, orderId } = route.params || {};
  const {
    topic = "Unknown Topic",
    order = [],
    projectsIds = [],
  } = roadmap || {};

  useEffect(() => {
    if (order.length > 0) {
      const flattened = flattenStructure(order);
      setFlatStructure(flattened);

      // Check if orderId exists, and set currentItem accordingly
      if (orderId) {
        const selectedIndex = flattened.findIndex(
          (item) => item.id === orderId
        );
        if (selectedIndex !== -1) {
          setSelectedItem(flattened[selectedIndex]);
          setCurrentIndex(selectedIndex); // Set the selectedIndex if orderId is found
        }
      } else if (courseId) {
        const selectedIndex = flattened.findIndex(
          (item) => item.id === courseId
        );
        setCurrentIndex(selectedIndex !== -1 ? selectedIndex : 0);
        setSelectedItem(flattened[selectedIndex]);
      }
    }
    setIsLoading(false);
  }, [order, courseId, orderId]);

  const flattenStructure = (items) => {
    const flat = [];
    items.forEach((item) => {
      if (!item || !item._id) return;
      flat.push({
        id: item._id,
        name: item.name || "No Name",
        description: item.description || "No Description",
        duration: item.duration || 0,
        xp: item.xp || 0,
        subCourses: item.subCourses || [],
      });
      if (item.subCourses?.length > 0) {
        flat.push(...flattenStructure(item.subCourses));
      }
    });
    return flat;
  };

  const handleNext = () => {
    if (currentIndex < flatStructure.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedItem(flatStructure[newIndex]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedItem(flatStructure[newIndex]);
    }
  };

  const toggleModal = () => {
    Animated.timing(slideAnim, {
      toValue: isModalVisible ? -300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsModalVisible(!isModalVisible));
  };

  const currentItem = selectedItem || flatStructure[currentIndex];

  const onSelectItem = (item) => {
    const index = flatStructure.findIndex((el) => el.id === item.id);
    setSelectedItem(item);
    setCurrentIndex(index); // Update currentIndex when selecting an item
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#075eec" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopBar
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToggleModal={toggleModal}
        currentIndex={currentIndex}
        totalItems={flatStructure.length}
        titile={roadmap.name}
      />

      <CourseDetails
        currentItem={currentItem}
        projectsIds={projectsIds}
        userProgress={userProgress}
      />

      <CourseOutlineModal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        slideAnim={slideAnim}
        flatStructure={flatStructure}
        onSelectItem={onSelectItem} // Pass onSelectItem to update selected item and index
        roadmap={roadmap}
        userProgress={userProgress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default ViewCourseOutlineScreen;
