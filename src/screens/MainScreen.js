import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useListUser } from "../apis/core/useListUser.js";

// ✅ Role Mapping
const roleMap = {
  0: "Admins",
  1: "Owners",
  2: "Managers",
  3: "Account Managers",
  4: "Content Managers",
  5: "Instructors",
  6: "Learners",
};

const MainScreen = () => {
  const navigation = useNavigation();
  const { data: userData = [], isLoading } = useListUser();

  // ✅ Loading State
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  // ✅ Role-based filtering using `userData` directly
  const totalAdmins = userData.filter((user) =>
    user?.roles?.map(String).includes("0")
  );
  const totalOwners = userData.filter((user) =>
    user?.roles?.map(String).includes("1")
  );
  const totalManagers = userData.filter((user) =>
    user?.roles?.map(String).includes("2")
  );
  const totalAccountManagers = userData.filter((user) =>
    user?.roles?.map(String).includes("3")
  );
  const totalContentManagers = userData.filter((user) =>
    user?.roles?.map(String).includes("4")
  );
  const totalInstructors = userData.filter((user) =>
    user?.roles?.map(String).includes("5")
  );
  const totalLearners = userData.filter((user) =>
    user?.roles?.map(String).includes("6")
  );
  // ✅ Calculate Total Users as the Sum of Role Counts
  const totalUsers =
    totalAdmins.length +
    totalOwners.length +
    totalManagers.length +
    totalAccountManagers.length +
    totalContentManagers.length +
    totalInstructors.length +
    totalLearners.length;

  // ✅ Construct role data dynamically
  const rolesData = [
    { title: "Total Users", count: totalUsers, roleKey: "all" }, // ✅ Total Users Card
    { title: "Admins", count: totalAdmins.length, roleKey: "0" },
    { title: "Owners", count: totalOwners.length, roleKey: "1" },
    { title: "Managers", count: totalManagers.length, roleKey: "2" },
    {
      title: "Account Managers",
      count: totalAccountManagers.length,
      roleKey: "3",
    },
    {
      title: "Content Managers",
      count: totalContentManagers.length,
      roleKey: "4",
    },
    { title: "Instructors", count: totalInstructors.length, roleKey: "5" },
    { title: "Learners", count: totalLearners.length, roleKey: "6" },
  ];

  // ✅ Render Role Card
  const renderRoleCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("UsersScreen", { role: item.roleKey })}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.count}>{item.count}</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
          style={styles.userImage}
        />
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/2.jpg" }}
          style={styles.userImage}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.showAllText}>Show All</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <Text style={styles.subHeader}>Roles List</Text>
      <Text style={styles.description}>
        A role provides access to predefined functionality and features so that
        depending on the assigned role, an admin can have access to what they
        need.
      </Text>

      <FlatList
        data={rolesData}
        renderItem={renderRoleCard}
        keyExtractor={(item) => item.title}
        numColumns={2}
        contentContainerStyle={[styles.gridContainer, { paddingBottom: 55 }]}
      />
    </View>
  );
};

export default MainScreen;

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fc",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#777",
    marginBottom: 15,
  },
  gridContainer: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  count: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 3,
  },
  buttonContainer: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  showAllText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
