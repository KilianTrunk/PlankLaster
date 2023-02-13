import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  message: string;
  onPress: () => void;
}

export default function AuthText(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View>
        <Text style={styles.message}>{props.message}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  message: {
    fontSize: 20,
    paddingHorizontal: 60,
    textAlign: "center",
    marginTop: "6%",
    color: "#afa8bf",
  },
});
