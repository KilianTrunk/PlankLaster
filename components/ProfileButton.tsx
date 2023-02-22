import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon } from "@rneui/themed";

interface Props {
    onPress: () => void;
}

const ProfileButton = (props: Props) => {
    const [showProfileModal, setShowProfileModal] = useState(false);

    return (
        <View style={styles.profileContainer}>
            <Button
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.button}
                onPress={() => {
                    setShowProfileModal(true);
                    props.onPress();
                }}
            >
                <Icon type="font-awesome" name="user" color="#2a2438" />
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        position: "absolute",
        top: "6%",
        right: "6%",
    },
    button: {
        backgroundColor: "#afa8bf",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginTop: "6%",
    },
    buttonTitle: {
        color: "#2a2438",
        paddingHorizontal: 6,
        fontWeight: "bold",
        fontSize: 18,
    },
});

export default ProfileButton;
