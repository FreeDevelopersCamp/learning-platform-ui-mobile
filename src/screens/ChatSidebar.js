import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ChatSidebar = ({
  users = [],
  onSelectUser,
  sessions = [],
  listSessions,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentSessions, setCurrentSessions] = useState(
    Array.isArray(sessions) ? sessions : []
  );

  useEffect(() => {
    if (listSessions) {
      const fetchSessions = async () => {
        try {
          const fetchedSessions = await listSessions();
          if (Array.isArray(fetchedSessions)) {
            setCurrentSessions(fetchedSessions);
          } else {
            setCurrentSessions([]); // Ensure an array
          }
        } catch (error) {
          console.error("❌ Error fetching sessions:", error);
          setCurrentSessions([]);
        }
      };

      fetchSessions();
    }
  }, [listSessions]);

  const roleOptions = [
    "All Roles",
    "Admin",
    "Owner",
    "Manager",
    "Account Manager",
    "Content Manager",
    "Instructor",
    "Learner",
  ];

  const roleMapping = {
    Admin: "0",
    Owner: "1",
    Manager: "2",
    "Account Manager": "3",
    "Content Manager": "4",
    Instructor: "5",
    Learner: "6",
  };

  // ✅ Ensure `isOnline` checks if `currentSessions` is an array
  const sortedUsers = useMemo(() => {
    return users
      .map((user) => {
        const isOnline =
          Array.isArray(currentSessions) &&
          currentSessions.some(
            (session) => session.username === user.userName && session.active
          );

        return { ...user, isOnline };
      })
      .sort((a, b) => b.isOnline - a.isOnline);
  }, [users, currentSessions]);

  const filteredUsers = useMemo(() => {
    return sortedUsers.filter((user) => {
      const fullName =
        `${user.personalInformation.name.first} ${user.personalInformation.name.last}`.toLowerCase();
      const matchesSearch = fullName.includes(searchQuery.toLowerCase());

      const userRoles = user.roles?.map(String) || ["unknown"];
      const selectedRoleNumber = roleMapping[selectedRole] || null;
      const matchesRole =
        selectedRole === "All Roles" ||
        (selectedRoleNumber && userRoles.includes(selectedRoleNumber));

      return matchesSearch && matchesRole;
    });
  }, [sortedUsers, searchQuery, selectedRole]);

  return (
    <View style={styles.sidebarContainer}>
      <View style={styles.filterContainer}>
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
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
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
              {roleOptions.map((role, index) => (
                <TouchableOpacity
                  key={index}
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

      <Text style={styles.title}>Users</Text>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => onSelectUser(item)}
          >
            <View
              style={[
                styles.avatarContainer,
                item.isOnline && styles.onlineBorder,
              ]}
            >
              <Image
                source={{
                  uri:
                    item.image && item.image.startsWith("https")
                      ? item.image
                      : `https://robohash.org/${encodeURIComponent(
                          `${item.personalInformation.name.first} ${item.personalInformation.name.last}`
                        )}?size=200x200`,
                }}
                style={styles.avatar}
              />
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {item.personalInformation.name.first}{" "}
                {item.personalInformation.name.last}
              </Text>
              <Text
                style={[
                  styles.userStatus,
                  item.isOnline ? styles.online : styles.offline,
                ]}
              >
                {item.isOnline ? "Online" : "Offline"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E7ECF2",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    flex: 5,
    paddingHorizontal: 10,
    marginRight: 10,
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
  roleText: {
    fontSize: 12,
    color: "black",
    textAlign: "center",
  },
  roleDropdown: {
    position: "absolute",
    top: 50,
    left: 0,
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 999,
  },
  roleOption: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  avatarContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 10,
  },
  onlineBorder: {
    borderWidth: 3,
    borderColor: "green",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  online: { color: "green" },
  offline: { color: "gray" },
});

export default ChatSidebar;
