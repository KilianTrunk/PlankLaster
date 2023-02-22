import React from 'react';
import { StyleSheet } from "react-native";
import { Button } from '@rneui/themed';
import { IconProps } from 'react-native-elements';

interface Props {
    title: string;
    icon: IconProps;
    onPress: () => void;
    disabled?: boolean;
}

const TimerButton = ( props: Props ) => {
    return (
        <Button
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            disabled={props.disabled}
            icon={props.icon}
            iconRight
            onPress={props.onPress}
        >
            {props.title}
        </Button>
    );
};

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

export default TimerButton;