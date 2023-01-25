import React, { useState } from "react";
import { View, Text } from "react-native";
import styles from "../styling/styles";

import { Input } from "@rneui/base";
import { Button, Icon } from "@rneui/themed";

import firebase from "../database/firebase";

import "../types";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleRightIconClick = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const userLogin = () => {
    if (password === "" || email === "") {
      alert("Vnesite manjkajoče podatke!");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res: any) => {
          alert("Prijava je bila uspešna!");
          setEmail("");
          setPassword("");
          navigation.navigate("Timer");
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={
            <Icon type="font-awesome" name="envelope" color="#afa8bf" />
          }
          leftIconContainerStyle={styles.inputLeftIcon}
          inputStyle={styles.inputText}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={secureTextEntry}
          textContentType="password"
          autoCapitalize="none"
          leftIcon={<Icon type="font-awesome" name="key" color="#afa8bf" />}
          leftIconContainerStyle={styles.inputLeftIcon}
          rightIcon={
            <Icon
              type="font-awesome"
              name="eye"
              color="#afa8bf"
              onPress={() => handleRightIconClick()}
            />
          }
          inputStyle={styles.inputText}
        />
      </View>
      <Button
        titleStyle={styles.buttonTitle}
        buttonStyle={styles.button}
        icon={{
          name: "arrow-right",
          type: "font-awesome",
          size: 16,
          color: "#2a2438",
        }}
        iconRight
        onPress={() => userLogin()}
      >
        Login
      </Button>
      <Text
        style={styles.alreadyOrNotRegisteredText}
        onPress={() => navigation.navigate("Register")}
      >
        Not registered yet? Register
      </Text>
    </View>
  );
}
