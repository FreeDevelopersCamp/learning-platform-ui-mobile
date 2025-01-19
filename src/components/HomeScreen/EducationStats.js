import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CapIcon from "../../assets/Icons/cap.svg";
import BookIcon from "../../assets/Icons/book.svg";
import BuildIcon from "../../assets/Icons/build.svg";

const EducationStats = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        More than a platform.{" "}
        <Text style={styles.bold}>Free Developers Camp</Text> is a commitment to
        bringing tech and open source collaboration to students and educators
        across the globe.
      </Text>
      <View style={styles.cards}>
        <View style={styles.card}>
          <CapIcon width={60} height={60} style={styles.icon} />
          <Text style={styles.cardHeading}>5 million students</Text>
          <Text style={styles.cardParagraph}>
            Connect with millions of peers who've expanded their skills through
            GitHub Education.
          </Text>
        </View>
        <View style={styles.card}>
          <BookIcon width={60} height={60} style={styles.icon} />
          <Text style={styles.cardHeading}>200K verified educators</Text>
          <Text style={styles.cardParagraph}>
            Collaborate with educators around the world who enhance their lesson
            plans and workstreams with GitHub tools.
          </Text>
        </View>
        <View style={styles.card}>
          <BuildIcon width={60} height={60} style={styles.icon} />
          <Text style={styles.cardHeading}>+2K educational institutions</Text>
          <Text style={styles.cardParagraph}>
            Join thousands of schools globally that incorporate GitHub into
            their tech curriculum.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "400",
    color: "#333",
    marginBottom: 16,
  },
  bold: {
    fontWeight: "700",
  },
  cards: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#f3f5f9",
    borderRadius: 12,
    padding: 16,
    margin: 8,
    width: "45%",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  icon: {
    marginBottom: 12,
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  cardParagraph: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
});

export default EducationStats;
