import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const TopBar = ({
  onPrevious,
  onNext,
  onToggleModal,
  currentIndex,
  totalItems,
  titile,
}) => {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity
        onPress={onPrevious}
        disabled={currentIndex === 0}
        style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
      >
        <Icon
          name="arrow-back"
          size={16}
          color={currentIndex === 0 ? "#ccc" : "#000"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onToggleModal} style={styles.menuButton}>
        <Icon name="menu" size={24} color="#000" />
        <Text style={styles.menuText}>{titile}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onNext}
        disabled={currentIndex >= totalItems - 1}
        style={[
          styles.navButton,
          currentIndex >= totalItems - 1 && styles.disabledButton,
        ]}
      >
        <Icon
          name="arrow-forward"
          size={16}
          color={currentIndex >= totalItems - 1 ? "#ccc" : "#000"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f1f1f1",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#eaeaea",
  },
  disabledButton: {
    backgroundColor: "#f5f5f5",
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#eaeaea",
  },
  menuText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
});

export default TopBar;
