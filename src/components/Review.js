import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Replace with your icon library if necessary

const Review = () => {
  return (
    <View style={styles.sectionWrapper}>
      <View style={styles.card}>
        <View style={styles.nameSection}>
          <View style={styles.label}>
            <Text style={styles.labelText}>Review</Text>
          </View>
          <MaterialIcons name="fitness-center" size={24} color="black" />
        </View>
        <View style={styles.cardContent}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
          <Text style={styles.description}>Lessons to review</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.card}>
        <View style={styles.nameSection}>
          <View style={styles.label}>
            <Text style={styles.labelText}>Practice</Text>
          </View>
          <MaterialIcons name="fitness-center" size={24} color="black" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.description}>
            Introduction to Statistics In Python
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.card}>
        <View style={styles.nameSection}>
          <View style={styles.label}>
            <Text style={styles.labelText}>Apply</Text>
          </View>
          <MaterialIcons name="account-tree" size={24} color="black" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.description}>Investigating Netflix Movies</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 120,
    backgroundColor: "transparent",
  },
  card: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  nameSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    backgroundColor: "#E0F7FA",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 8,
  },
  labelText: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#FFA726",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },
  description: {
    fontSize: 14,
    fontWeight: "600",
    color: "#757575",
  },
  divider: {
    width: 2,
    height: "80%",
    backgroundColor: "#E0E0E0",
    marginHorizontal: 8,
  },
});

export default Review;
