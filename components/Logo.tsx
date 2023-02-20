import React from "react";
import { Image, StyleSheet } from "react-native";

const logo = require("../images/logo.png");

const Logo = () => {
  return <Image source={logo} style={styles.logo} />;
};

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    marginBottom: "1%",
  },
});

export default Logo;
