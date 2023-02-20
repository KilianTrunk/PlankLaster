import React from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "@rneui/base";
import { Icon } from "@rneui/themed";

interface Props {
    onChangeText: React.Dispatch<React.SetStateAction<string>>;
    value: string;
    secureTextEntry: boolean;
    onPress: () => void;
}

const PasswordInput = (props: Props) => {
  return (
    <View style={styles.inputContainer}>
      <Input
        placeholder="Password"
        onChangeText={props.onChangeText}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
        textContentType="password"
        autoCapitalize="none"
        leftIcon={<Icon type="font-awesome" name="key" color="#afa8bf" />}
        leftIconContainerStyle={styles.inputLeftIcon}
        rightIcon={
          <Icon
            type="font-awesome"
            name="eye"
            color="#afa8bf"
            onPress={() => props.onPress()}
          />
        }
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

export default PasswordInput;