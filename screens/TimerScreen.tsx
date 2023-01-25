import React, { useState, useEffect } from "react";
import { Text, View } from "../components/Themed";

import styles from "../styling/styles";

import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Button } from "@rneui/themed";

import firebase from "../database/firebase";

export default function TimerScreen() {
  const [duration, setDuration] = useState(10);
  const [remainingTime, setRemainingTime] = useState<number>();
  const [elapsedTime, setElapsedTime] = useState<number>();
  const [isTimerPlaying, setIsTimerPlaying] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(
    firebase.auth().currentUser?.displayName
  );

  const onPressPause = () => {
    setIsTimerPlaying(!isTimerPlaying);
    calculateElapsedTime();
  };

  const handleUpdate = (remainingTime: any) => {
    setRemainingTime(remainingTime);
  };

  const calculateElapsedTime = () => {
    if (remainingTime) {
      let timeElapsed = duration - remainingTime;
      setElapsedTime(timeElapsed);
    }

    console.log(username);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName);
      } else {
        setUsername(null);
        console.log("Ni prijavljenega user-ja");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello, {username}</Text>
      <View style={styles.timerContainer}>
        <CountdownCircleTimer
          isPlaying={isTimerPlaying}
          strokeLinecap={"butt"}
          duration={duration}
          colors={["#5c5470", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 0]}
          onUpdate={handleUpdate}
          onComplete={() => {
            return { shouldRepeat: true };
          }}
        >
          {({ remainingTime }) => (
            <Text style={styles.timerText}>{remainingTime}</Text>
          )}
        </CountdownCircleTimer>
      </View>
      <Button
        titleStyle={styles.buttonTitle}
        buttonStyle={styles.button}
        icon={{
          name: "emoticon-sad",
          type: "material-community",
          size: 16,
          color: "#2a2438",
        }}
        iconRight
        onPress={() => onPressPause()}
      >
        I couldn't last longer
      </Button>
      {!isTimerPlaying && <Text>Remaining Time: {remainingTime}</Text>}
      {!isTimerPlaying && <Text>Elapsed Time: {elapsedTime}</Text>}
    </View>
  );
}
