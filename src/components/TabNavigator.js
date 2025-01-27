import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

const TabNavigator = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  const tabs = [
    { name: "Dashboard", icon: "grid-outline", label: "Dashboard" },
    {
      name: "Notifications",
      icon: "notifications-outline",
      label: "Notifications",
    },
    { name: "Chat", icon: "chatbubble-outline", label: "Chat" },
    { name: "Profile", icon: "person-outline", label: "Profile" },
    { name: "My Library", icon: "book-outline", label: "Library" },
  ];

  return (
    <View style={styles.bottomTabs}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tabButton}
          onPress={() => handleNavigation(tab.name)}
        >
          <Icon
            name={tab.icon}
            size={24}
            color={route.name === tab.name ? "#4C9EEB" : "#000"}
          />
          <Text
            style={[
              styles.tabText,
              { color: route.name === tab.name ? "#4C9EEB" : "#000" },
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabs: {
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  tabText: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 4,
  },
});

export default TabNavigator;
