import React, { PropsWithChildren } from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";

import { Text, View } from "./Themed";

export default function Section({
  title = "",
  containerStyle,
  titleContainerStyle,
  children,
}: {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  children?: PropsWithChildren<any>;
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.titleContainer, titleContainerStyle]}>
        <Text style={styles.text} semibold>
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 10, paddingHorizontal: 20 },
  titleContainer: {
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
  },
});
