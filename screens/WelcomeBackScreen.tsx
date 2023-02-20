import React from "react";
import Container from "../components/Container";
import Logo from "../components/Logo";
import LandingText from "../components/LandingText";
import AuthButton from "../components/AuthButton";

interface WelcomeBackScreenProps {
  closeModal: () => void;
  username: string;
}

const WelcomeBackScreen = (props: WelcomeBackScreenProps) => {
  return (
    <Container>
      <Logo />
      <LandingText
        text={`Welcome back, ${props.username}! Are you ready to make your abdominal muscles burn and try to beat your plank lasting time goal?`}
      />
      <AuthButton authType="I'm ready!" onPress={props.closeModal} />
    </Container>
  );
};

export default WelcomeBackScreen;
