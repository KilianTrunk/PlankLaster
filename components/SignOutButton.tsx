import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

interface Props {
  onPress: () => void;
}

const SignOutButton = (props: Props) => {
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <Text style={styles.signOutText}>Sign out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signOutText: {
    fontSize: 20,
    textAlign: "center",
    color: "#afa8bf",
    marginTop: "60%",
  },
});

export default SignOutButton;