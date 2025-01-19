import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const InstructorSection = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://s.udemycdn.com/home/non-student-cta/instructor-1x-v3.jpg",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Become an instructor</Text>
        <Text style={styles.description}>
          Instructors from around the world teach millions of learners on FDC.
          We provide the tools and skills to teach what you love.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.buttonText}>Start teaching today</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#fff",
  },
  imageContainer: {
    padding: 16,
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    marginLeft: 16,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#2563eb",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InstructorSection;
