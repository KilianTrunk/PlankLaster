import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2a2438",
  },

  welcomeBackText: {
    fontSize: 20,
    textAlign: "center",
    color: "#afa8bf",
    marginBottom: "6%",
    width: "86%"
  },

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

  logo: {
    width: 150,
    height: 150,
    marginBottom: "3%",
  }
});
