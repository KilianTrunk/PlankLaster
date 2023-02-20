import React from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

interface Props {
  text: string;
}

const NormalText = (props: Props) => {
  return <Text style={styles.normalText}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  normalText: {
    fontSize: 20,
    paddingHorizontal: 60,
    textAlign: "center",
    marginBottom: "6%",
    color: "#afa8bf",
  },
});

export default NormalText;
