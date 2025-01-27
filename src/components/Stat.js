// Stat.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Stat = ({ title, data, bgColor, iconName, iconColor, iconBgColor }) => {
  return (
    <View style={[styles.statContainer, { backgroundColor: bgColor }]}>
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        <Icon name={iconName} size={30} color={iconColor} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.data, { color: iconColor }]}>{data || 0}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  data: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default Stat;
