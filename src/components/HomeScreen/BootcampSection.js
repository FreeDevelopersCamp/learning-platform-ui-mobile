import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const jobCards = [
  { title: "Data Science", icon: "🔍" },
  { title: "Programming & Development", icon: "💻" },
  { title: "Artificial Intelligence", icon: "🤖" },
  { title: "Business", icon: "📈" },
  { title: "Autonomous Systems", icon: "🚗" },
  { title: "Product Management", icon: "📋" },
  { title: "Cloud Computing", icon: "☁️" },
];

const BootcampSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bootcamp level quality,{" "}
        <Text style={styles.highlight}>at a free of the cost.</Text>
      </Text>
      <Text style={styles.subtitle}>Explore courses by job function</Text>
      <View style={styles.cardsContainer}>
        {jobCards.map((job, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              activeIndex === index ? styles.activeCard : null,
            ]}
            onPress={() => setActiveIndex(index)}
          >
            <Text style={styles.icon}>{job.icon}</Text>
            <Text style={styles.cardTitle}>{job.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#162447",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  highlight: {
    color: "#00FF7F",
  },
  subtitle: {
    fontSize: 16,
    color: "#ddd",
    marginTop: 10,
    textAlign: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    width: 120,
    alignItems: "center",
    margin: 10,
    elevation: 3,
  },
  activeCard: {
    borderWidth: 2,
    borderColor: "#00FF7F",
  },
  icon: {
    fontSize: 30,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BootcampSection;
