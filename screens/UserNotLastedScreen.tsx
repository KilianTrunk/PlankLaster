import React from "react";
import Container from "../components/Container";
import AuthButton from "../components/AuthButton";
import NormalText from "../components/NormalText";

interface UserNotLastedScreenProps {
    closeModal: () => void;
    longestLastingPlankGoal?: number;
    lastedPlankTime?: number;
}

const UserNotLastedScreen = (props: UserNotLastedScreenProps) => {
  return (
    <Container paddingTop="14%">
      <NormalText
        text={`You have lasted for ${props.lastedPlankTime} second(s).`}
      />
      <NormalText
        text={`Your longest lasting plank goal is ${props.longestLastingPlankGoal} seconds. Let's try to beat it!`}
      />
      <AuthButton authType="I'm ready!" onPress={props.closeModal} />
    </Container>
  );
};

export default UserNotLastedScreen;
