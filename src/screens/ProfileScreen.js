import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { useAppContext } from "../contexts/app/AppContext";

const getRoleString = (role) => {
  switch (role) {
    case "0":
      return "Admin";
    case "1":
      return "Owner";
    case "2":
      return "Manager";
    case "3":
      return "Account Manager";
    case "4":
      return "Content Manager";
    case "5":
      return "Instructor";
    case "6":
      return "Learner";
    default:
      return "Unknown Role";
  }
};

const ProfileScreen = () => {
  const { user } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    about: user?.personalInformation?.about || "",
    work: "You have not added works yet.",
    certifications: "You have not added certifications yet.",
    courseCompletion: "You have not completed any content yet.",
    experience: "You have not added any experiences yet.",
    education: "You have not added education yet.",
  });

  const handleUpdate = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Logic to save the updated data (API call or context update)
    setIsEditing(false);
    console.log("Updated Data:", updatedData);
  };

  const handleDelete = () => {
    // Logic to delete the account
    console.log("Account deleted");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={{ uri: user?.image || "https://via.placeholder.com/100" }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>
            {user?.personalInformation?.name?.first}{" "}
            {user?.personalInformation?.name?.last}
          </Text>
          <Text style={styles.userRoles}>
            {user?.roles?.map((role) => getRoleString(role)).join(", ")}
          </Text>
        </View>
        <TouchableOpacity style={styles.headerRight} onPress={handleUpdate}>
          <Icon name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Info Sections */}
      {[
        {
          title: "About Me",
          content: isEditing ? (
            <TextInput
              style={styles.input}
              value={updatedData.about}
              onChangeText={(text) =>
                setUpdatedData((prev) => ({ ...prev, about: text }))
              }
            />
          ) : (
            updatedData.about || "You have not added about section yet."
          ),
        },
        {
          title: "My Work",
          content: isEditing ? (
            <TextInput
              style={styles.input}
              value={updatedData.work}
              onChangeText={(text) =>
                setUpdatedData((prev) => ({ ...prev, work: text }))
              }
            />
          ) : (
            updatedData.work
          ),
        },
        {
          title: "My Certifications",
          content: isEditing ? (
            <TextInput
              style={styles.input}
              value={updatedData.certifications}
              onChangeText={(text) =>
                setUpdatedData((prev) => ({ ...prev, certifications: text }))
              }
            />
          ) : (
            updatedData.certifications
          ),
        },
        {
          title: "My Work Experience",
          content: isEditing ? (
            <TextInput
              style={styles.input}
              value={updatedData.experience}
              onChangeText={(text) =>
                setUpdatedData((prev) => ({ ...prev, experience: text }))
              }
            />
          ) : (
            updatedData.experience
          ),
        },
        {
          title: "My Education",
          content: isEditing ? (
            <TextInput
              style={styles.input}
              value={updatedData.education}
              onChangeText={(text) =>
                setUpdatedData((prev) => ({ ...prev, education: text }))
              }
            />
          ) : (
            updatedData.education
          ),
        },
      ].map((section, index) => (
        <View key={index} style={styles.infoSection}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text>{section.content}</Text>
        </View>
      ))}

      {/* Footer Buttons */}
      {isEditing && (
        <View style={styles.footerButtons}>
          <Button title="Save" onPress={handleSave} />
          <Button title="Delete Account" onPress={handleDelete} color="red" />
        </View>
      )}

      {/* Footer Branding */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by</Text>
        <Text style={styles.footerLogo}>freeDevelopersCamp</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#075eec",
    borderRadius: 15,
    padding: 20,
    position: "relative",
    margin: 16,
  },
  headerContent: {
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  userRoles: {
    fontSize: 14,
    color: "#cce0ff",
    textAlign: "center",
    marginTop: 5,
  },
  headerRight: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  infoSection: {
    marginVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  footerButtons: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    alignItems: "center",
    marginVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#999",
  },
  footerLogo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#075eec",
    marginTop: 5,
  },
});

export default ProfileScreen;
