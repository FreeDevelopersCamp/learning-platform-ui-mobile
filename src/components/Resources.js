import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { WebView } from "react-native-webview"; // For embedding video resources

const Resources = ({ resource, typeLabels }) => {
  if (!resource || !resource.type) {
    return (
      <View style={styles.resourceContainer}>
        <Text style={styles.resourceTitle}>Invalid Resource</Text>
        <Text>This resource is missing type information or is undefined.</Text>
      </View>
    );
  }

  return (
    <View style={styles.resourceContainer}>
      {resource.type === "0" && (
        <View>
          <Text style={styles.resourceTitle}>Article: {resource.name}</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(resource.url)}
            style={styles.resourceLink}
          >
            <Text style={styles.resourceLinkText}>Read Article</Text>
          </TouchableOpacity>
        </View>
      )}
      {resource.type === "1" && (
        <View>
          {/* <Text style={styles.resourceTitle}>Video: {resource.name}</Text> */}
          <WebView
            source={{
              uri: `https://www.youtube.com/embed/${new URL(
                resource.url
              ).searchParams.get("v")}`,
            }}
            style={styles.webview}
          />
        </View>
      )}
      {/* Add additional types as needed */}
      {!typeLabels[resource.type] && (
        <View>
          <Text style={styles.resourceTitle}>
            Unknown Type: {resource.name}
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(resource.url)}
            style={styles.resourceLink}
          >
            <Text style={styles.resourceLinkText}>Open Resource</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  resourceContainer: {
    marginBottom: 16,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  resourceLink: {
    marginTop: 8,
  },
  resourceLinkText: {
    color: "#075eec",
    textDecorationLine: "underline",
  },
  webview: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
});

export default Resources;
