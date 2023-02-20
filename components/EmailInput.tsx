import React from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "@rneui/base";
import { Icon } from "@rneui/themed";

interface Props {
    onChangeText: React.Dispatch<React.SetStateAction<string>>;
    value: string;
}

const EmailInput = (props: Props) => {
  return (
    <View style={styles.inputContainer}>
      <Input
        placeholder="Email"
        onChangeText={props.onChangeText}
        value={props.value}
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        leftIcon={<Icon type="font-awesome" name="envelope" color="#afa8bf" />}
        leftIconContainerStyle={styles.inputLeftIcon}
        inputStyle={styles.inputText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: "86%",
    },
    inputLeftIcon: {
        paddingRight: 10,
    },
    inputText: {
        color: "#afa8bf",
    },
});

export default EmailInput;
