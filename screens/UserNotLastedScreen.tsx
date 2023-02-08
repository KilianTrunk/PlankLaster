import React from "react";
import { View, Text } from "react-native";
import { Button } from "@rneui/themed";
import styles from "../styling/UserNotLastedScreenStyles";

interface UserNotLastedScreenProps {
    closeModal: () => void;
    longestLastingPlankGoal?: number;
    lastedPlankTime?: number;
}

export default function UserNotLastedScreen(props: UserNotLastedScreenProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.userInfoText}>
                You have lasted for {props.lastedPlankTime} second(s).
            </Text>
            <Text style={styles.userInfoText}>
                Your longest lasting plank goal is {props.longestLastingPlankGoal} seconds. Let's try to beat it!
            </Text>
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
                I'm ready!
            </Button>
        </View>
    );
}
