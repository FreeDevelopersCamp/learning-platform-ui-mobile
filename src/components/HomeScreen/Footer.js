import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <View style={styles.container}>
      <View style={styles.linksContainer}>
        <View style={styles.linkGroup}>
          <Text style={styles.title}>For Business</Text>
          <TouchableOpacity>
            <Text style={styles.link}>Employer</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>Health Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>Individual</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.linkGroup}>
          <Text style={styles.title}>Resources</Text>
          <TouchableOpacity>
            <Text style={styles.link}>Resources Center</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>Testimonials</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>STV</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.linkGroup}>
          <Text style={styles.title}>Partners</Text>
          <TouchableOpacity>
            <Text style={styles.link}>Minute Magic</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.linkGroup}>
          <Text style={styles.title}>Company</Text>
          <TouchableOpacity>
            <Text style={styles.link}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>Press</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>Career</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.socialMedia}>
        <Image
          style={styles.icon}
          source={require("../../assets/Images/facebook.png")}
        />
        <Image
          style={styles.icon}
          source={require("../../assets/Images/twitter.png")}
        />
        <Image
          style={styles.icon}
          source={require("../../assets/Images/linkedin.png")}
        />
        <Image
          style={styles.icon}
          source={require("../../assets/Images/instagram.png")}
        />
      </View>
      <Text style={styles.copyright}>
        @{currentYear} FreeDevelopersCamp, Inc.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#18212F",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  linksContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  linkGroup: {
    width: "45%",
    marginBottom: 16,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  link: {
    color: "#bbb",
    fontSize: 14,
    marginBottom: 4,
  },
  socialMedia: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  copyright: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
});

export default Footer;
