import React, { useState } from "react";
import { View } from "react-native";
import styles from "../styling/LoginScreenStyles";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/firebase";

import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";
import AuthText from "../components/AuthText";

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
          alert(errorCode);
        });
    }
  };

  return (
    <View style={styles.container}>
      <EmailInput
        onChangeText={setEmail}
        value={email}
      />
      <PasswordInput
        onChangeText={setPassword}
        value={password}
        secureTextEntry={secureTextEntry}
        onPress={() => handleRightIconClick()}
      />
      <AuthButton
        authType="Login"
        onPress={userLogin}
      />
      <AuthText
        message="Not registered yet? Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}