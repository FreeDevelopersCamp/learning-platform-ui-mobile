import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useDarkMode } from "../../contexts/DarkModeContext";

const Header = ({ atHome = false }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.logo}>FreeDevelopersCamp</Text>
      </TouchableOpacity>
      {!atHome && (
        <TouchableOpacity onPress={toggleDarkMode}>
          <MaterialCommunityIcons
            name={isDarkMode ? "weather-sunny" : "moon-waning-crescent"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#18212F",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  logo: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Header;
