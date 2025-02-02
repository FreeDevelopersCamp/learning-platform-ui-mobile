import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useListUser } from "../apis/core/useListUser";

// ✅ Role Mapping
const roleMap = {
  0: "Admin",
  1: "Owner",
  2: "Manager",
  3: "Account Manager",
  4: "Content Manager",
  5: "Instructor",
  6: "Learner",
};

const UserTableScreen = () => {
  const navigation = useNavigation();
  const { data: userData = [], isLoading } = useListUser();

  // ✅ Search & Filter States
  const [searchText, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null); // Track which user menu is open

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  // ✅ Filter Users based on Search & Role
  const filteredUsers = userData.filter((user) => {
    const fullName =
      `${user?.personalInformation?.name?.first} ${user?.personalInformation?.name?.last}`.toLowerCase();
    const email = user?.contacts?.email?.toLowerCase();
    const role = roleMap[user?.roles?.[0]];

    const matchesSearch =
      fullName.includes(searchText.toLowerCase()) ||
      email.includes(searchText.toLowerCase());

    const matchesRole = selectedRole === "All Roles" || role === selectedRole;

    return matchesSearch && matchesRole;
  });

  // ✅ Render User Row
  const renderUserRow = ({ item }) => (
    <View style={styles.row}>
      {/* Dark Themed Checkbox */}
      {/* <Checkbox status="unchecked" color="#444" uncheckedColor="#555" style={styles.checkbox} /> */}

      {/* Profile Image */}
      <Image
        source={{
          uri: item?.image || "https://randomuser.me/api/portraits/men/1.jpg",
        }}
        style={styles.profileImage}
      />

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {item?.personalInformation?.name?.first}{" "}
          {item?.personalInformation?.name?.last}
        </Text>
      </View>

      {/* Email */}
      <Text style={styles.userEmail}>{item?.contacts?.email}</Text>

      {/* Role */}
      <Text style={styles.userRole}>
        {roleMap[item?.roles?.[0]] || "Unknown"}
      </Text>

      {/* More Options */}
      <TouchableOpacity
        onPress={() =>
          setDropdownVisible(dropdownVisible === item._id ? null : item._id)
        }
        style={styles.moreOptions}
      >
        <Icon name="ellipsis-vertical" size={20} color="#333" />
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {dropdownVisible === item._id && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setDropdownVisible(null);
              navigation.navigate("UserProfileScreen", { userId: item._id });
            }}
          >
            <Icon name="eye-outline" size={16} color="#007bff" />
            <Text style={styles.dropdownText}>View Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setDropdownVisible(null);
              console.log(`Deactivate user: ${item._id}`); // Replace with actual deactivation logic
            }}
          >
            <Icon name="person-remove-outline" size={16} color="#dc3545" />
            <Text style={styles.dropdownText}>Deactivate</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ✅ Title */}
      <Text style={styles.title}>All Users</Text>

      {/* ✅ Search & Role Filter Section */}
      <View style={styles.filterContainer}>
        {/* 🔹 Search Bar with Icon */}
        <View style={styles.searchBarContainer}>
          <Icon
            name="search"
            size={20}
            color="gray"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Search by name..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* 🔹 Role Filter Dropdown */}
        <View style={styles.rolePickerContainer}>
          <TouchableOpacity
            style={styles.roleSelector}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Text style={styles.roleText}>{selectedRole}</Text>
            <Icon
              name={isDropdownOpen ? "chevron-up" : "chevron-down"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
          {isDropdownOpen && (
            <View style={styles.roleDropdown}>
              {["All Roles", ...Object.values(roleMap)].map((role) => (
                <TouchableOpacity
                  key={role}
                  style={styles.roleOption}
                  onPress={() => {
                    setSelectedRole(role);
                    setIsDropdownOpen(false);
                  }}
                >
                  <Text style={styles.roleOptionText}>{role}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* ✅ Users List */}
      <FlatList
        data={filteredUsers}
        renderItem={renderUserRow}
        keyExtractor={(item) => item._id || item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default UserTableScreen;

// ✅ Styles
const styles = StyleSheet.create({
  dropdownMenu: {
    position: "absolute",
    right: 30,
    top: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    zIndex: 999,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownText: {
    marginLeft: 8,
    fontSize: 14,
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fc",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 15,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    flex: 5,
    paddingHorizontal: 10,
    height: 45,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchBar: {
    flex: 1,
    height: "100%",
  },
  rolePickerContainer: {
    flex: 4,
    backgroundColor: "#FFF",
    borderRadius: 10,
    height: 45,
    justifyContent: "center",
  },
  roleSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  roleDropdown: {
    position: "absolute",
    top: 50,
    left: 0,
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 3,
    zIndex: 999,
  },
  roleOption: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: "center",
    elevation: 3,
    position: "relative",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 2,
  },
  userEmail: {
    flex: 2,
    fontSize: 12,
    color: "#555",
  },
  moreOptions: {
    paddingHorizontal: 10,
  },
});
