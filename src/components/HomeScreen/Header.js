import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Header = ({ atHome = false }) => {
  const navigation = useNavigation(); // Access navigation from context

  return (
    <View style={styles.container}>
      {/* Menu Icon */}
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <MaterialCommunityIcons name="menu" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.logo}>FreeDevelopersCamp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18212F",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  logo: {
    flex: 1,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Header;
