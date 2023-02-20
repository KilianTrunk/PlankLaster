import React from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

interface Props {
  text: string;
}

const LandingText = (props: Props) => {
  return <Text style={styles.landingText}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  landingText: {
    fontSize: 20,
    textAlign: "center",
    color: "#afa8bf",
    marginBottom: "6%",
    width: "86%",
  },
});

export default LandingText;
