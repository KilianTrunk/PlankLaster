import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

type ContainerProps = {
  children: ReactNode;
  paddingTop?: string;
};

const Container = ({ children, paddingTop }: ContainerProps) => {
  return <View style={[styles.container, { paddingTop }]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2a2438",
  },
});

export default Container;
