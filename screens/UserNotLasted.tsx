import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "@rneui/themed";
import styles from "../styling/styles";

import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get, update } from "firebase/database";

interface UserNotLastedScreenProps {
    closeModal: () => void;
}

export default function UserNotLastedScreen(props: UserNotLastedScreenProps) {
    const [username, setUsername] = useState<string>("");
    const [lastedTime, setLastedTime] = useState<number>();
    const [lastedTimeGoal, setLastedTimeGoal] = useState<number>();

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

    const handleLastedTimeGoal = () => {
        if (lastedTime) {
            let newLastingTimeGoal = lastedTime + 10;
            setLastedTimeGoal(newLastingTimeGoal);

            if (lastedTimeGoal) {
                const db = getDatabase();
                update(ref(db, `users/${username}`), {
                    lastedTimeGoal
                });
            }
        }
    }

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user && user.displayName) {
            setUsername(user.displayName);
        }
    }, []);

    useEffect(() => {
        getLastedTime();
        handleLastedTimeGoal();
    });

    return (
        <View style={styles.container}>
            <Text style={styles.alreadyOrNotRegisteredText}>
                Your longest lasting plank seems to be exactly {lastedTime} seconds. Lets improve this time by 10 seconds.
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
