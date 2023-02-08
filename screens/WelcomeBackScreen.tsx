import React from "react";
import { View, Text, Image } from "react-native";
import { Button } from "@rneui/themed";
import styles from "../styling/styles";

interface WelcomeBackScreenProps {
    closeModal: () => void;
    username: string;
}

export default function WelcomeBackScreen(props: WelcomeBackScreenProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.alreadyOrNotRegisteredText}>
                welcome back, {props.username}!
            </Text>
            <Text></Text>
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
                onPress={() => props.closeModal()}
            >
                Lets go!
            </Button>
        </View>
    );
}
