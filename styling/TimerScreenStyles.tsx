import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2a2438",
        paddingTop: "6%",
    },

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

    timerText: {
        fontWeight: "bold",
        fontSize: 20,
    },

    timerContainer: {
        paddingBottom: "6%",
    },
});
