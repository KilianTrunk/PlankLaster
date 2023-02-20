import React from "react";
import { Text, StyleSheet } from "react-native";

interface Props {
  username: string;
  longestLastingPlankGoal: number | undefined;
}

const UserData = (props: Props) => {
  return (
    <>
      <Text style={styles.userData}>Username : {props.username}</Text>
      <Text style={styles.userData}>
        Plank lasting time goal : {props.longestLastingPlankGoal} seconds
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  userData: {
    fontSize: 20,
    textAlign: "center",
    color: "#afa8bf",
    marginBottom: "3%",
  },
});

export default UserData;
