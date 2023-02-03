import React, { useState, useEffect } from "react";
import { Modal } from "react-native";
import { View, Text } from "../components/Themed";
import styles from "../styling/styles";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Button } from "@rneui/themed";
import FirstTimeScreen from "./FirstTimeScreen";

import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default function TimerScreen() {
  const [duration, setDuration] = useState(10);
  const [remainingTime, setRemainingTime] = useState<number>();
  const [lastedTime, setLastedTime] = useState<number>();
  const [isTimerPlaying, setIsTimerPlaying] = useState(false);
  const [showFirstTimeModal, setShowFirstTimeModal] = useState(true);
  const [username, setUsername] = useState<string>("");

  const onPressPause = () => {
    calculateLastedTime();
    setIsTimerPlaying(!isTimerPlaying);
  };

  const handleUpdate = (remainingTime: any) => {
    setRemainingTime(remainingTime);
  };

  const saveLastedTime = () => {
    if (username && lastedTime) {
      const db = getDatabase();
      set(ref(db, `users/${username}`), {
        lastedTime
      });
    }
  };

  const calculateLastedTime = () => {
    if (remainingTime) {
      let timeLasted= duration - remainingTime;
      setLastedTime(timeLasted);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && user.displayName) {
      setUsername(user.displayName);
    }
  }, []);

  useEffect(() => {
    saveLastedTime();
  });

  return (
    <View style={styles.container}>
      <Text>Hello, {username}</Text>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showFirstTimeModal}
      >
        <FirstTimeScreen
          closeModal={() => {
            setShowFirstTimeModal(false);
          }}
        />
      </Modal>
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
        onPress={() => {
          onPressPause();
        }}
      >
        I couldn't last longer
      </Button>
      {!isTimerPlaying && <Text>Remaining Time: {remainingTime}</Text>}
      {!isTimerPlaying && <Text>Lasted Time: {lastedTime}</Text>}
    </View>
  );
}

