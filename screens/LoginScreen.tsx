import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import styles from "../styling/LoginScreenStyles";

import { Input } from "@rneui/base";
import { Button, Icon } from "@rneui/themed";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/firebase";

import "../types";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleRightIconClick = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const userLogin = () => {
    if (email === "" || password === "") {
      alert("Enter missing information!");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
          navigation.navigate('Timer');
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          const errorMessage = error.message;
          alert(errorCode)
          console.log(errorMessage);
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
        style={styles.notRegisteredText}
        onPress={() => navigation.navigate("Register")}
      >
        Not registered yet? Register
      </Text>
    </View>
  );
}
