import React, { useState } from "react";
import { View } from "react-native";
import styles from "../styling/RegisterScreenStyles";

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import UsernameInput from "../components/UsernameInput";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";
import AuthText from "../components/AuthText";

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
          alert(errorCode);
          // ..
        });
    }
  };

  return (
    <View style={styles.container}>
      <UsernameInput
        onChangeText={setUsername}
        value={username}
      />
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
        authType="Register"
        onPress={registerUser}
      />
      <AuthText
        message="Already registered? Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}