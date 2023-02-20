import React from "react";
import Container from "../components/Container";
import LandingText from "../components/LandingText";
import AuthButton from "../components/AuthButton";

interface FirstTimeScreenProps {
  closeModal: () => void;
}

const FirstTimeScreen = (props: FirstTimeScreenProps) => {
  return (
    <Container paddingTop="12%">
      <LandingText
        text="For starters, lets try to break the world record lasting in the plank
        position as long as the current world record holder Daniel Scali did - 9 hours, 30 minutes and 1 second (This way we will be able to identicate your current longest lasting
        plank and set the longest lasting plank goal)"
      />
      <LandingText
        text="Note : when you can't last longer, make sure to press on the 'I couldn't
        last longer' button"
      />
      <AuthButton authType="I'm ready!" onPress={props.closeModal} />
    </Container>
  );
};

export default FirstTimeScreen;
