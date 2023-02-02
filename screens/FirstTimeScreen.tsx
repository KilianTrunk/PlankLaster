import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "@rneui/themed";
import styles from "../styling/styles";

interface FirstTimeScreenProps {
  closeModal: () => void;
}

export default function FirstTimeScreen(props: FirstTimeScreenProps) {
  return (
    <View style={styles.container}>
      <Text>
        For starters, lets try to break the world record lasting in the plank
        position as long as George Hood did
      </Text>
      <Text>
        Note : when you can't last longer, make sure to press on the "I couldn't
        last longer" button
      </Text>
      <Text>
        This way we will be able to identicate your current longest lasting
        plank
      </Text>
      <Button
        icon={{
          name: "arrow-right",
          type: "font-awesome",
          size: 16,
          color: "#2a2438",
        }}
        iconRight
        onPress={() => props.closeModal()}
      >
        I'm ready!
      </Button>
    </View>
  );
}
