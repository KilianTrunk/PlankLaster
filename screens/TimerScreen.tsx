import React, { useState, useEffect } from "react";
import { Modal } from "react-native";
import { View, Text } from "../components/Themed";
import styles from "../styling/styles";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Button } from "@rneui/themed";
import FirstTimeScreen from "./FirstTimeScreen";
import UserLastedScreen from "./UserLastedScreen";
import UserNotLastedScreen from "./UserNotLasted";

import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default function TimerScreen() {
  const [duration, setDuration] = useState<number>(34201);
  const [remainingTime, setRemainingTime] = useState<number>();
  const [lastedTime, setLastedTime] = useState<number>();
  const [isTimerPlaying, setIsTimerPlaying] = useState<boolean>(false);
  const [showFirstTimeModal, setShowFirstTimeModal] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [buttonTitle, setButtonTitle] = useState<string>("Start");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [buttonIcon, setButtonIcon] = useState<string>("play");
  const [showUserLastedModal, setShowUserLastedModal] = useState<boolean>(false);
  const [showUserNotLastedModal, setShowUserNotLastedModal] = useState<boolean>(false);
  const [key, setKey] = useState(0);
  const [timerColorsTime, setTimerColorsTime] = useState<Array<number>>([]);

  const handleButtonTitle = () => {
    if (buttonTitle == "I couldn't last longer") {
      setButtonDisabled(true);
    } else {
      setButtonTitle("I couldn't last longer");
      setButtonIcon("emoticon-sad");
    }
  }

  const onPressPause = () => {
    calculateLastedTime();
    setIsTimerPlaying(!isTimerPlaying);
    handleButtonTitle();
    console.log(timerColorsTime[0], timerColorsTime[1], timerColorsTime[2], timerColorsTime[3]);
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
      let timeLasted = duration - remainingTime;
      setLastedTime(timeLasted);
    }
  };

  const calculateTimerColorsTime = () => {
    setTimerColorsTime([duration, duration * 0.7, duration * 0.5, 0]);
  };
  
  useEffect(() => {
    calculateTimerColorsTime();
  }, [duration]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && user.displayName) {
      setUsername(user.displayName);
    }
  }, []);

  useEffect(() => {
    saveLastedTime();

    if (buttonDisabled == true) {
      if (buttonTitle == "I couldn't last longer") // timer stopped by user
      {
        setTimeout(() => {
          setShowUserNotLastedModal(true);
        }, 500); // delay of half a second
      } else // timer ran out
      {
        setShowUserLastedModal(true);
      }
    }
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
      <Modal
        animationType="slide"
        transparent={false}
        visible={showUserLastedModal}
      >
        <UserLastedScreen
          closeModal={() => {
            setShowUserLastedModal(false);
            setButtonDisabled(false);
          }}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showUserNotLastedModal}
      >
        <UserNotLastedScreen
          closeModal={() => {
            setShowUserNotLastedModal(false);
            setButtonDisabled(false);
            setKey(prevKey => prevKey + 1)
          }}
        />
      </Modal>
      <View style={styles.timerContainer}>
        <CountdownCircleTimer
          key={key}
          isPlaying={isTimerPlaying}
          strokeLinecap={"butt"}
          duration={duration}
          colors={["#5c5470", "#5c5470", "#A30000", "#A30000"]}
          colorsTime={[timerColorsTime[0], timerColorsTime[1], timerColorsTime[2], timerColorsTime[3]]}
          onUpdate={handleUpdate}
          onComplete={() => {
            setLastedTime(duration);
            setButtonDisabled(true);
            saveLastedTime();
            setButtonTitle("Congratulations!");
            setButtonIcon("emoticon-happy");
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
        disabled={buttonDisabled}
        icon={{
          name: buttonIcon,
          type: "material-community",
          size: 16,
          color: "#2a2438",
        }}
        iconRight
        onPress={() => {
          onPressPause();
        }}
      >
        {buttonTitle}
      </Button>
      {!isTimerPlaying && <Text>Remaining Time: {remainingTime}</Text>}
      {!isTimerPlaying && <Text>Lasted Time: {lastedTime}</Text>}
    </View>
  );
}

