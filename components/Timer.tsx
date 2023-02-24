import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

interface Props {
    duration: number;
    isTimerPlaying: boolean;
    myKey: number;
    timerColorsTime: number[];
    handleUpdate: (remainingTime: number) => void;
    setLastedTime: (time: number) => void;
    increaseLastedTimeGoal: () => void;
    saveLastedTimeGoal: () => void;
    setButtonDisabled: (disabled: boolean) => void;
    saveLastedTime: () => void;
    setButtonTitle: (title: string) => void;
    setButtonIcon: (icon: string) => void;
}

const Timer = (props: Props) => (
    <View style={styles.timerContainer}>
        {isNaN(props.duration) ? (
            <ActivityIndicator size="large" color="#5c5470" />
        ) : (
            <CountdownCircleTimer
                key={props.myKey}
                isPlaying={props.isTimerPlaying}
                strokeLinecap={"butt"}
                duration={props.duration}
                colors={["#5c5470", "#5c5470", "#A30000", "#A30000"]}
                colorsTime={[
                    props.timerColorsTime[0],
                    props.timerColorsTime[1],
                    props.timerColorsTime[2],
                    props.timerColorsTime[3],
                ]}
                onUpdate={props.handleUpdate}
                onComplete={() => {
                    props.setLastedTime(props.duration);
                    props.increaseLastedTimeGoal();
                    props.saveLastedTimeGoal();
                    props.setButtonDisabled(true);
                    props.saveLastedTime();
                    props.setButtonTitle("Congratulations!");
                    props.setButtonIcon("emoticon-happy");
                }}
            >
                {({ remainingTime }) => (
                    <Text style={styles.timerText}>{remainingTime}</Text>
                )}
            </CountdownCircleTimer>
        )}
    </View>
);

const styles = StyleSheet.create({
    timerText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#afa8bf",
    },

    timerContainer: {
        paddingBottom: "6%",
    },
});


export default Timer;
