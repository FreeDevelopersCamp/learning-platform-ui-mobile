import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ViewProject = ({ order }) => {
  if (!order) {
    return <Text>No project details available.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{order.name}</Text>
      <Text style={styles.description}>{order.description}</Text>
      <Text style={styles.metaInfo}>Duration: {order.duration} hours</Text>
      <Text style={styles.metaInfo}>XP: {order.xp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  metaInfo: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
});

export default ViewProject;
