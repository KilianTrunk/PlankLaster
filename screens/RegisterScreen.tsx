import React, { useState } from "react";
import { View, Text } from "react-native";
import styles from "../styling/RegisterScreenStyles";

import { Input } from "@rneui/base";
import { Button, Icon } from "@rneui/themed";

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import "../types";

export default function RegisterScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleRightIconClick = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const registerUser = () => {
    if (email === "" || password === "" || username === "") {
      alert("Enter missing information!");
    } else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;

          if (auth.currentUser) {
            updateProfile(auth.currentUser, {
              displayName: username
            })
              .catch((error) => {
                console.log(error.message);
              });
          }

          alert("Registration was successfull! You may login now!")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode);
          // ..
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          textContentType="username"
          keyboardType="default"
          autoCapitalize="none"
          leftIcon={<Icon type="font-awesome" name="user" color="#afa8bf" />}
          leftIconContainerStyle={styles.inputLeftIconUser}
          inputStyle={styles.inputText}
        />
      </View>
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
        onPress={() => registerUser()}
      >
        Register
      </Button>
      <Text
        style={styles.alreadyRegisteredText}
        onPress={() => navigation.navigate("Login")}
      >
        Already registered? Login
      </Text>
    </View>
  );
}
