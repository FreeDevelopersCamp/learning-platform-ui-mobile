import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const InstructorsSet = ({ instructor }) => {
  const handleButtonClick = () => {
    console.log("Navigate to instructor profile", instructor?.userName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="people-outline" size={24} color="#18212F" />
        <Text style={styles.title}>INSTRUCTORS</Text>
      </View>

      <TouchableOpacity style={styles.instructor} onPress={handleButtonClick}>
        <Image
          source={{
            uri: instructor?.user?.image || "https://via.placeholder.com/150",
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>
          {instructor?.user?.userName || "Unknown"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 15,
    gap: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  instructor: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "100%",
    backgroundColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    color: "#555",
  },
});

export default InstructorsSet;
