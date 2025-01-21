import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import Styles from "../common/Styles";
import Colors from "../constants/Colors";
import MyHeader from "../components/MyHeader";

export default function ColorScreen({ route, navigation }) {
  const viewRef = useRef(null);
  const [bgColor, setBgColor] = useState(Colors.white);

  useEffect(() => {
    switch (route.name) {
      case "Home":
        setBgColor(Colors.primary);
        break;
      case "Search":
        setBgColor(Colors.green);
        break;
      case "Add":
        setBgColor(Colors.red);
        break;
      case "Account":
        setBgColor(Colors.purple);
        break;
      case "Like":
        setBgColor(Colors.yellow);
        break;
      default:
        setBgColor(Colors.white);
    }
  }, [route.name]);

  return (
    <Animated.View
      ref={viewRef}
      entering={FadeIn.duration(800)}
      style={[Styles.container, { backgroundColor: bgColor }]}
    >
      <MyHeader
        menu
        onPressMenu={() => navigation.goBack()}
        title={route.name}
        right="more-vertical"
        onRightPress={() => console.log("Right icon pressed")}
      />
      <View style={[Styles.container, { backgroundColor: bgColor }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
