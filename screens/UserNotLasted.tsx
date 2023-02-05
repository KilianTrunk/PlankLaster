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
    const [username, setUsername] = useState<string>("");
    const [lastedTime, setLastedTime] = useState<number>();
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

    const getLastedTime = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${username}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setLastedTime(snapshot.val().lastedTime);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user && user.displayName) {
            setUsername(user.displayName);
        }
    }, []);

    useEffect(() => {
        getLastedTime();
        getLastedTimeGoal();
    }, []);

    return (
        <View style={styles.container}>
            {lastedTimeGoal && <Text style={styles.alreadyOrNotRegisteredText}>
                Your longest lasting plank goal is {lastedTimeGoal} seconds. Lets try to beat it!
            </Text>}
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
