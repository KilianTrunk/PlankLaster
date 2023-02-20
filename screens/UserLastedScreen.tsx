import React from "react";
import ConfettiCannon from "react-native-confetti-cannon";
import Container from "../components/Container";
import AuthButton from "../components/AuthButton";
import NormalText from "../components/NormalText";

interface UserLastedScreenProps {
  closeModal: () => void;
}

const UserLastedScreen = (props: UserLastedScreenProps) => {
  return (
    <Container paddingTop="14%">
      <ConfettiCannon
        colors={["mistyrose", "orchid", "gold"]}
        fadeOut={true}
        count={200}
        origin={{ x: -10, y: 0 }}
      />
      <NormalText
        text="Congratulations, Daniel Scali Junior! Lets keep your abdominal muscles working and try to beat your new plank lasting time goal!"
      />
      <AuthButton authType="I'm ready!" onPress={props.closeModal} />
    </Container>
  );
};

export default UserLastedScreen;
