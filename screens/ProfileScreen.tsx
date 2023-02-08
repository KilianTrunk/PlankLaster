import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Button } from "@rneui/themed";
import styles from "../styling/ProfileScreenStyles";

import { getAuth, signOut } from "firebase/auth";

const logo = require('../images/logo.png');

interface ProfileScreenProps {
    username: string;
    longestLastingPlankGoal?: number;
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
            <Image source={logo} style={styles.logo} />
            <Text style={styles.userData}>
                Username : {props.username}
            </Text>
            <Text style={styles.userData}>
                Plank lasting time goal : {props.longestLastingPlankGoal} seconds
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
                Go back
            </Button>
            <TouchableOpacity onPress={signUserOut}>
                <Text style={styles.signOutText}>
                    Sign out
                </Text>
            </TouchableOpacity>
        </View>
    );
}
