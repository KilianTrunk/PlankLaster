import React from "react";
import { getAuth, signOut } from "firebase/auth";
import Container from "../components/Container";
import Logo from "../components/Logo";
import UserData from "../components/UserData";
import AuthButton from "../components/AuthButton";
import SignOutButton from "../components/SignOutButton";

interface ProfileScreenProps {
  username: string;
  longestLastingPlankGoal?: number;
  navigation: any;
  closeModal: () => void;
}

const ProfileScreen = ({ navigation, ...props }: ProfileScreenProps) => {
  const signUserOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      props.closeModal();
      navigation.navigate("Login");
    });
  };

  return (
    <Container paddingTop="55%">
      <Logo />
      <UserData
        username={props.username}
        longestLastingPlankGoal={props.longestLastingPlankGoal}
      />
      <AuthButton authType="Go back" onPress={props.closeModal} />
      <SignOutButton onPress={signUserOut} />
    </Container>
  );
};

export default ProfileScreen;
