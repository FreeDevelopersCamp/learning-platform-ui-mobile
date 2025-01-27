import React from "react";
import { Text } from "react-native";
import ViewProject from "./ViewProject";
import ViewCourse from "./ViewCourse";

const CourseDetails = ({ currentItem, projectsIds, userProgress }) => {
  if (!currentItem) {
    return <Text>No item details available.</Text>;
  }

  return projectsIds.includes(currentItem.id) ? (
    <ViewProject order={currentItem} />
  ) : (
    <ViewCourse order={currentItem} userProgress={userProgress} />
  );
};

export default CourseDetails;
