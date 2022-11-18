/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
  Button as DefaultButton,
  Pressable,
  Platform,
  StyleProp,
  PressableProps,
  StyleSheet
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type TextWeights = {
  thin?: boolean;
  light?: boolean;
  extraLight?: boolean;
  semibold?: boolean;
  medium?: boolean;
  bold?: boolean;
};

export type TextProps = ThemeProps & DefaultText["props"] & TextWeights;
export type TextInputProps = ThemeProps &
  DefaultTextInput["props"] &
  TextWeights;
export type ViewProps = ThemeProps & DefaultView["props"];
export type ButtonProps = ThemeProps & DefaultButton["props"];

export function Text(props: TextProps) {
  const {
    style,
    lightColor,
    darkColor,
    thin,
    light,
    extraLight,
    semibold,
    medium,
    bold,
    ...otherProps
  } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const fontFamily = [
    thin && { fontFamily: "Roboto_100Thin" },
    light && { fontFamily: "Roboto_300Light" },
    extraLight && { fontFamily: "Montserrat_200ExtraLight" },
    medium && { fontFamily: "Roboto_500Medium" },
    semibold && { fontFamily: "Montserrat_600SemiBold" },
    bold && { fontFamily: "Roboto_700Bold" },
  ];

  return (
    <DefaultText
      style={[{ color, fontFamily: "Roboto_400Regular" }, fontFamily, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const {
    style,
    lightColor,
    darkColor,
    thin,
    light,
    extraLight,
    semibold,
    medium,
    bold,
    ...otherProps
  } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const fontFamily = [
    thin && { fontFamily: "Roboto_100Thin" },
    light && { fontFamily: "Roboto_300Light" },
    extraLight && { fontFamily: "Montserrat_200ExtraLight" },
    medium && { fontFamily: "Roboto_500Medium" },
    semibold && { fontFamily: "Montserrat_600SemiBold" },
    bold && { fontFamily: "Roboto_700Bold" },
  ];

  return (
    <DefaultTextInput
      style={[{ color, fontFamily: "Roboto_400Regular" }, fontFamily, style]}
      {...otherProps}
    />
  );
}

export function Button(
  props: ButtonProps & { style?: StyleProp<PressableProps> }
) {
  const { lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "tint");

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.button,
        styles.shadow,
        props.style,
        { backgroundColor: pressed ? "#0d78d6" : color },
      ]}
    >
      <Text medium style={styles.button_text}>
        {props.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 15,
  },
  button_text: {
    textTransform: "uppercase",
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  },
  shadow: {
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
});
