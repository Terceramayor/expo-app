import React from "react";
import { TouchableOpacity,StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { Text } from "./Themed";

export default function Avatar({ initials = "OS" }: { initials?: string }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{initials}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
    backgroundColor: Colors.light.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
  text: {
    color: Colors.light.background,
  },
});
