import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "@rneui/themed";
import styles from "../styling/styles";

import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get, update } from "firebase/database";

interface UserLastedScreenProps {
    closeModal: () => void;
}

export default function UserLastedScreen(props: UserLastedScreenProps) {
    const [username, setUsername] = useState<string>("");
    const [lastedTimeGoal, setLastedTimeGoal] = useState<number>();

    const getLastedTimeGoal = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${username}`)).then((snapshot) => {
            if (snapshot.exists()) {
                let newLastingTimeGoal = snapshot.val().lastedTimeGoal;
                setLastedTimeGoal(newLastingTimeGoal);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    const increaseLastedTimeGoal = () => {
        if(lastedTimeGoal)
        setLastedTimeGoal(lastedTimeGoal + 10)
    }

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user && user.displayName) {
            setUsername(user.displayName);
        }
    }, []);

    useEffect(() => {
        getLastedTimeGoal();
        increaseLastedTimeGoal();
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.alreadyOrNotRegisteredText}>
                Congratulations, Daniel Scali Junior! Lets keep your abdominal muscles working and try to beat your new plank lasting time goal! 
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
