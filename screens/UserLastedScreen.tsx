import React from "react";
import { View, Text } from "react-native";
import { Button } from "@rneui/themed";
import styles from "../styling/UserLastedScreen";
import ConfettiCannon from 'react-native-confetti-cannon';

interface UserLastedScreenProps {
    closeModal: () => void;
}

export default function UserLastedScreen(props: UserLastedScreenProps) {

    return (
        <View style={styles.container}>
            <ConfettiCannon colors={["mistyrose", "orchid", "gold"]} fadeOut={true} count={200} origin={{x: -10, y: 0}} />
            <Text style={styles.userInfoText}>
                Congratulations, Daniel Scali Junior! Lets keep your abdominal muscles working and try to beat your new plank lasting time goal! 
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
