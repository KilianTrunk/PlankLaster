import React, { useState, useEffect } from "react";
import FirstTimeScreen from "./FirstTimeScreen";
import WelcomeBackScreen from "./WelcomeBackScreen";
import UserLastedScreen from "./UserLastedScreen";
import UserNotLastedScreen from "./UserNotLastedScreen";
import ProfileScreen from "./ProfileScreen";
import Container from "../components/Container";
import ModalScreen from "../components/ModalScreen";
import TimerButton from "../components/TimerButton";
import ProfileButton from "../components/ProfileButton";
import Timer from "../components/Timer";
import useAuth from "../hooks/useAuth";
import { getDatabase, ref, update, get, child } from "firebase/database";

const TimerScreen = ({ navigation }: any) => {
  const [duration, setDuration] = useState<number>(34201);
  const [remainingTime, setRemainingTime] = useState<number>();
  const [lastedTime, setLastedTime] = useState<number>();
  const [isTimerPlaying, setIsTimerPlaying] = useState<boolean>(false);
  const [username, setUsername] = useAuth();
  const [buttonTitle, setButtonTitle] = useState<string>("Start");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [buttonIcon, setButtonIcon] = useState<string>("play");
  const [key, setKey] = useState(0);
  const [timerColorsTime, setTimerColorsTime] = useState<Array<number>>([]);
  const [lastedTimeGoal, setLastedTimeGoal] = useState<number>();
  const [userIsNew, setUserIsNew] = useState<boolean>();
  const [firstTimeModalShown, setFirstTimeModalShown] = useState<boolean>();
  const [modals, setModals] = useState({
    firstTimeModal: true,
    welcomeBackModal: true,
    userLastedModal: false,
    userNotLastedModal: false,
    profileModal: false,
  });


  const checkIfUserIsNew = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${username}`)).then((snapshot) => {
      snapshot.val() !== null && snapshot.val().lastedTimeGoal !== undefined
        ? (setUserIsNew(false), setDuration(snapshot.val().lastedTimeGoal))
        : (setUserIsNew(true), setDuration(34201));
    });
  };

  const saveLastedTimeGoal = () => {
    username && lastedTimeGoal
      ? update(ref(getDatabase(), `users/${username}`), {
        lastedTimeGoal,
      })
      : null;
  };


  const getLastedTimeGoal = () => {
    const dbRef = ref(getDatabase());

    lastedTimeGoal == undefined
      ? get(child(dbRef, `users/${username}`)).then((snapshot) => {
        snapshot.exists()
          ? setLastedTimeGoal(snapshot.val().lastedTimeGoal)
          : lastedTime
            ? (setLastedTimeGoal(lastedTime + 10), saveLastedTimeGoal())
            : null;
      })
      : (saveLastedTimeGoal(),
        get(child(dbRef, `users/${username}`)).then((snapshot) => {
          snapshot.exists()
            ? setLastedTimeGoal(snapshot.val().lastedTimeGoal)
            : null;
        }));
  };

  const handleButtonTitle = () => {
    buttonTitle == "I couldn't last longer"
      ? setButtonDisabled(true)
      : (setButtonTitle("I couldn't last longer"),
        setButtonIcon("emoticon-sad"));
  };

  const increaseLastedTimeGoal = () => {
    duration
      ? (setLastedTimeGoal(duration + 10), saveLastedTimeGoal())
      : null;
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
    username && lastedTime
      ? update(ref(getDatabase(), `users/${username}`), { lastedTime })
      : null;
  };

  const calculateLastedTime = () => {
    remainingTime && duration
      ? setLastedTime(duration - remainingTime)
      : null;
  };

  const calculateTimerColorsTime = () => {
    duration ? setTimerColorsTime([duration, duration * 0.7, duration * 0.4, 0]) : null;
  };

  useEffect(() => {
    checkIfUserIsNew();
  }, [userIsNew]);

  useEffect(() => {
    calculateTimerColorsTime();
  }, [duration]);

  useEffect(() => {
    checkIfUserIsNew();
  }, []);

  useEffect(() => {
    getLastedTimeGoal();
    saveLastedTime();

    buttonDisabled === true ? (buttonTitle === "I couldn't last longer" ? (saveLastedTimeGoal(), setModals({ ...modals, userNotLastedModal: true })) : setModals({ ...modals, userLastedModal: true })) : null;

  }, [buttonDisabled]);

  return (
    <Container paddingTop="6%">
      <ModalScreen
        visible={modals.profileModal}
        closeModal={() => {
          setModals({ ...modals, profileModal: false });
        }}
        component={ProfileScreen}
        componentProps={{
          username: username,
          longestLastingPlankGoal: duration,
          navigation: navigation,
        }}
      />
      <ProfileButton
        onPress={() => {
          setModals({ ...modals, profileModal: true });
        }}
      />
      {duration === 34201 && userIsNew ? (
        <ModalScreen
          visible={modals.firstTimeModal}
          closeModal={() => {
            setModals({ ...modals, firstTimeModal: false });
            setFirstTimeModalShown(true);
          }}
          component={FirstTimeScreen}
        />
      ) : !firstTimeModalShown ? (
        <ModalScreen
          visible={modals.welcomeBackModal}
          closeModal={() => {
            setModals({ ...modals, welcomeBackModal: false });
          }}
          component={WelcomeBackScreen}
          componentProps={{
            username: username,
          }}
        />
      ) : null}
      <ModalScreen
        visible={modals.userLastedModal}
        closeModal={() => {
          setModals({ ...modals, userLastedModal: false });
          setIsTimerPlaying(false);
          setKey((prevKey) => prevKey + 10);
          if (lastedTimeGoal != undefined) setDuration(lastedTimeGoal);
          setButtonTitle("Start");
          setButtonIcon("play");
          setButtonDisabled(false);
        }}
        component={UserLastedScreen}
      />
      <ModalScreen
        visible={modals.userNotLastedModal}
        closeModal={() => {
          setModals({ ...modals, userNotLastedModal: false });
          setButtonDisabled(false);
          setKey((prevKey) => prevKey + 10);
          if (lastedTimeGoal != undefined) setDuration(lastedTimeGoal);
          setButtonTitle("Start");
          setButtonIcon("play");
        }}
        component={UserNotLastedScreen}
        componentProps={{
          longestLastingPlankGoal: lastedTimeGoal,
          lastedPlankTime: lastedTime
        }}
      />
      <Timer
        duration={duration}
        isTimerPlaying={isTimerPlaying}
        timerColorsTime={[
          timerColorsTime[0],
          timerColorsTime[1],
          timerColorsTime[2],
          timerColorsTime[3],
        ]}
        myKey={key}
        handleUpdate={handleUpdate}
        setLastedTime={setLastedTime}
        increaseLastedTimeGoal={increaseLastedTimeGoal}
        saveLastedTimeGoal={saveLastedTimeGoal}
        setButtonDisabled={setButtonDisabled}
        saveLastedTime={saveLastedTime}
        setButtonTitle={setButtonTitle}
        setButtonIcon={setButtonIcon}
      />
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