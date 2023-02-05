import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "@rneui/themed";
import styles from "../styling/styles";

import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";

interface UserNotLastedScreenProps {
    closeModal: () => void;
}

export default function UserNotLastedScreen(props: UserNotLastedScreenProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.alreadyOrNotRegisteredText}>
                Your longest lasting plank goal is "TODO: DODAJ TA CAS" seconds. Lets try to beat it!
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
                I'm ready!
            </Button>
        </View>
    );
}
