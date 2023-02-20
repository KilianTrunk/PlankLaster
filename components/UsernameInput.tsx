import React from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "@rneui/base";
import { Icon } from "@rneui/themed";

interface Props {
    onChangeText: React.Dispatch<React.SetStateAction<string>>;
    value: string;
}

const UsernameInput = (props: Props) => {
  return (
    <View style={styles.inputContainer}>
      <Input
        placeholder="Username"
        onChangeText={props.onChangeText}
        value={props.value}
        textContentType="username"
        keyboardType="default"
        autoCapitalize="none"
        leftIcon={<Icon type="font-awesome" name="user" color="#afa8bf" />}
        leftIconContainerStyle={styles.inputLeftIconUser}
        inputStyle={styles.inputText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2a2438",
    },
    inputContainer: {
        width: "86%",
    },
    inputLeftIcon: {
        paddingRight: 10,
    },
    inputLeftIconUser: {
        paddingRight: 14,
    },
    inputText: {
        color: "#afa8bf",
    },
});

export default UsernameInput;