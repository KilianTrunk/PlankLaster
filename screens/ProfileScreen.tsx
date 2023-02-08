import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";
import styles from "../styling/styles";

import { getAuth, signOut } from "firebase/auth";

interface ProfileScreenProps {
    navigation: any;
    closeModal: () => void;
}

export default function ProfileScreen({ navigation, ...props }: ProfileScreenProps) {
    const signUserOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            props.closeModal();
            navigation.navigate("Login");
        })

    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={signUserOut}>
                <Text style={styles.alreadyOrNotRegisteredText}>
                    Sign out
                </Text>
                <Text></Text>
            </TouchableOpacity>
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
                Go back
            </Button>
        </View>
    );
}
