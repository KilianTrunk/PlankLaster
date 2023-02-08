import React from "react";
import { View, Text, Image } from "react-native";
import { Button } from "@rneui/themed";
import styles from "../styling/WelcomeBackScreenStyles";

const logo = require('../images/logo.png');

interface WelcomeBackScreenProps {
    closeModal: () => void;
    username: string;
}

export default function WelcomeBackScreen(props: WelcomeBackScreenProps) {
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.welcomeBackText}>
                Welcome back, {props.username}! Are you ready to make your abdominal muscles burn and try to beat your plank lasting time goal?
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
