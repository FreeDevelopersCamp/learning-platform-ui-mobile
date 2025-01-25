import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Header = () => {
  const navigation = useNavigation();

  const handleToggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.container}>
      {/* Menu Icon */}
      <TouchableOpacity onPress={handleToggleDrawer}>
        <MaterialCommunityIcons name="menu" size={30} color="#fff" />
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
