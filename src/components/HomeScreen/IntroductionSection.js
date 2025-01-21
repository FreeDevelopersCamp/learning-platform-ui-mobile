import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import SvgPython from "../../../assets/Icons/python.svg";
import SvgGit from "../../../assets/Icons/git.svg";
import SvgReact from "../../../assets/Icons/react.svg";
import SvgNodeJs from "../../../assets/Icons/node-js.svg";
import SvgJavaScript from "../../../assets/Icons/javascript.svg";

const logos = [
  { Component: SvgPython, size: 35 },
  { Component: SvgGit, size: 40 },
  { Component: SvgReact, size: 35 },
  { Component: SvgNodeJs, size: 40 },
  { Component: SvgJavaScript, size: 30 },
];

const IntroductionSection = () => {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const CurrentLogo = logos[currentLogoIndex];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/Images/programming-team.png")}
          style={{ width: 250, height: 250 }}
        />

        <View style={styles.iconContainer}>
          <CurrentLogo.Component
            width={CurrentLogo.size}
            height={CurrentLogo.size}
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Learn to <Text style={styles.highlight}>&lt;/code&gt;</Text> and Start
          your Career in Tech
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Browse Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>Start learning for free →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  imageContainer: {
    position: "relative",
    width: 250,
    height: 250,
    borderRadius: 125,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  iconContainer: {
    position: "absolute",
    bottom: 27,
    right: 27,
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  textContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  highlight: {
    color: "#007BFF",
  },
  buttonsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});

export default IntroductionSection;
