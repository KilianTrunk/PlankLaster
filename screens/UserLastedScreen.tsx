import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "@rneui/themed";
import styles from "../styling/styles";

interface UserLastedScreenProps {
    closeModal: () => void;
}

export default function UserLastedScreen(props: UserLastedScreenProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.alreadyOrNotRegisteredText}>
                UserLastedScreen TEST
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
