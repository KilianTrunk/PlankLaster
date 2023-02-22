import React, { useState, useEffect } from "react";
import {
  Modal,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import styles from "../styling/TimerScreenStyles";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Button, Icon } from "@rneui/themed";
import FirstTimeScreen from "./FirstTimeScreen";
import WelcomeBackScreen from "./WelcomeBackScreen";
import UserLastedScreen from "./UserLastedScreen";
import UserNotLastedScreen from "./UserNotLastedScreen";
import ProfileScreen from "./ProfileScreen";
import Container from "../components/Container";
import ModalScreen from "../components/ModalScreen";
import TimerButton from "../components/TimerButton";
import ProfileButton from "../components/ProfileButton";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, update, get, child } from "firebase/database";

const TimerScreen = ({ navigation }: any) => {
  const [duration, setDuration] = useState<number>(34201);
  const [remainingTime, setRemainingTime] = useState<number>();
  const [lastedTime, setLastedTime] = useState<number>();
  const [isTimerPlaying, setIsTimerPlaying] = useState<boolean>(false);
  const [showFirstTimeModal, setShowFirstTimeModal] = useState<boolean>(true);
  const [showWelcomeBackModal, setShowWelcomeBackModal] =
    useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [buttonTitle, setButtonTitle] = useState<string>("Start");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [buttonIcon, setButtonIcon] = useState<string>("play");
  const [showUserLastedModal, setShowUserLastedModal] =
    useState<boolean>(false);
  const [showUserNotLastedModal, setShowUserNotLastedModal] =
    useState<boolean>(false);
  const [key, setKey] = useState(0);
  const [timerColorsTime, setTimerColorsTime] = useState<Array<number>>([]);
  const [lastedTimeGoal, setLastedTimeGoal] = useState<number>();
  const [userIsNew, setUserIsNew] = useState<boolean>();
  const [firstTimeModalShown, setFirstTimeModalShown] = useState<boolean>();
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  const checkIfUserIsNew = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${username}`)).then((snapshot) => {
      if (
        snapshot.val() !== null &&
        snapshot.val().lastedTimeGoal !== undefined
      ) {
        // user is old
        setUserIsNew(false);
        setDuration(snapshot.val().lastedTimeGoal);
      } else {
        // user is new
        setUserIsNew(true);
        setDuration(34201);
      }
    });
  };

  const saveLastedTimeGoal = () => {
    if (username && lastedTimeGoal) {
      const db = getDatabase();
      update(ref(db, `users/${username}`), {
        lastedTimeGoal,
      });
    }
  };

  const getLastedTimeGoal = () => {
    const dbRef = ref(getDatabase());

    if (lastedTimeGoal == undefined) {
      get(child(dbRef, `users/${username}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setLastedTimeGoal(snapshot.val().lastedTimeGoal);
        } else if (lastedTime) {
          setLastedTimeGoal(lastedTime + 10);
          saveLastedTimeGoal();
        }
      });
    } else {
      saveLastedTimeGoal();
      get(child(dbRef, `users/${username}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setLastedTimeGoal(snapshot.val().lastedTimeGoal);
        }
      });
    }
  };

  const handleButtonTitle = () => {
    if (buttonTitle == "I couldn't last longer") {
      setButtonDisabled(true);
    } else {
      setButtonTitle("I couldn't last longer");
      setButtonIcon("emoticon-sad");
    }
  };

  const increaseLastedTimeGoal = () => {
    if (duration) {
      setLastedTimeGoal(duration + 10);
      saveLastedTimeGoal();
    }
  };

  const onPressPause = () => {
    calculateLastedTime();
    setIsTimerPlaying(!isTimerPlaying);
    handleButtonTitle();
  };

  const handleUpdate = (remainingTime: any) => {
    setRemainingTime(remainingTime);
  };

  const saveLastedTime = () => {
    if (username && lastedTime) {
      const db = getDatabase();
      update(ref(db, `users/${username}`), {
        lastedTime,
      });
    }
  };

  const calculateLastedTime = () => {
    if (remainingTime && duration) {
      let timeLasted = duration - remainingTime;
      setLastedTime(timeLasted);
    }
  };

  const calculateTimerColorsTime = () => {
    if (duration)
      setTimerColorsTime([duration, duration * 0.7, duration * 0.4, 0]);
  };

  useEffect(() => {
    checkIfUserIsNew();
  }, [userIsNew]);

  useEffect(() => {
    calculateTimerColorsTime();
  }, [duration]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && user.displayName) {
      setUsername(user.displayName);
    }

    checkIfUserIsNew();
  }, []);

  useEffect(() => {
    getLastedTimeGoal();
    saveLastedTime();

    if (buttonDisabled == true) {
      if (buttonTitle == "I couldn't last longer") {
        // timer stopped by user
        saveLastedTimeGoal();
        setShowUserNotLastedModal(true);
      } // timer ran out
      else {
        setShowUserLastedModal(true);
      }
    }
  }, [buttonDisabled]);

  return (
    <Container paddingTop="6%">
      <ModalScreen
        visible={showProfileModal}
        closeModal={() => {
          setShowProfileModal(false);
        }}
        component={ProfileScreen}
        componentProps={{
          username: username,
          longestLastingPlankGoal: duration,
          navigation: navigation,
        }}
      />
      <ProfileButton
        onPress={() => setShowProfileModal(true)}
      />
      {duration === 34201 && userIsNew ? (
        <ModalScreen
          visible={showFirstTimeModal}
          closeModal={() => {
            setShowFirstTimeModal(false);
            setFirstTimeModalShown(true);
          }}
          component={FirstTimeScreen}
        />
      ) : !firstTimeModalShown ? (
        <ModalScreen
          visible={showWelcomeBackModal}
          closeModal={() => {
            setShowWelcomeBackModal(false);
          }}
          component={WelcomeBackScreen}
          componentProps={{
            username: username,
          }}
        />
      ) : null}
      <ModalScreen
        visible={showUserLastedModal}
        closeModal={() => {
          setShowUserLastedModal(false);
          setIsTimerPlaying(false);
          setKey((prevKey) => prevKey + 10);
          if (lastedTimeGoal != undefined) setDuration(lastedTimeGoal);
          setButtonTitle("Start");
          setButtonIcon("play");
          setButtonDisabled(false);
        }}
        component={UserLastedScreen} // pass component type, not component instance
      />
      <ModalScreen
        visible={showUserNotLastedModal}
        closeModal={() => {
          setShowUserNotLastedModal(false);
          setButtonDisabled(false);
          setKey((prevKey) => prevKey + 10);
          if (lastedTimeGoal != undefined) setDuration(lastedTimeGoal);
          setButtonTitle("Start");
          setButtonIcon("play");
        }}
        component={UserNotLastedScreen}
        componentProps={{
          longestLastingPlankGoal: duration,
          lastedPlankTime: lastedTime
        }}
      />
      <View style={styles.timerContainer}>
        {isNaN(duration) ? (
          <ActivityIndicator size="large" color="#5c5470" />
        ) : (
          <CountdownCircleTimer
            key={key}
            isPlaying={isTimerPlaying}
            strokeLinecap={"butt"}
            duration={duration}
            colors={["#5c5470", "#5c5470", "#A30000", "#A30000"]}
            colorsTime={[
              timerColorsTime[0],
              timerColorsTime[1],
              timerColorsTime[2],
              timerColorsTime[3],
            ]}
            onUpdate={handleUpdate}
            onComplete={() => {
              setLastedTime(duration);
              increaseLastedTimeGoal();
              saveLastedTimeGoal();
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
        )}
      </View>
      <TimerButton
        title={buttonTitle}
        icon={{
          name: buttonIcon,
          type: "material-community",
          size: 16,
          color: "#2a2438",
        }}
        onPress={() => {
          onPressPause();
        }}
        disabled={buttonDisabled}
      />
    </Container>
  );
};

export default TimerScreen;