import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet} from "react-native";
import Colors from "../constants/Colors";
import Avatar from "./Avatar";
import Searchbar from "./Seachbar";
import { Text, View } from "./Themed";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

export default function Header(props: NativeStackHeaderProps) {
  return (
    <SafeAreaView style={style.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text bold style={style.welcomeText}>
            Welcome buddy
          </Text>
          <Text style={style.helpText}>Let's start looking for hotels!</Text>
        </View>
        <Avatar />
      </View>
      <Searchbar containerStyle={style.searchBarStyle} {...props} />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: Colors.light.background,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.light.primary,
  },
  helpText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.light.helpText,
  },
  searchBarStyle: {
    marginVertical: 10,
  },
});
