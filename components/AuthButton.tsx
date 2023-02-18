import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

interface Props {
    authType: string;
    onPress: () => void;
}

export default function AuthButton(props: Props) {
    return (
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
            onPress={() => props.onPress()}
        >
            {props.authType}
        </Button>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#afa8bf",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    buttonTitle: {
        color: "#2a2438",
        paddingHorizontal: 6,
        fontWeight: "bold",
        fontSize: 18,
    },
});
