/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import Header from "../components/Header";
import HomeScreen from "../screens/HomeScreen";
import HotelDetails from "../screens/HotelDetails";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={HomeScreen}
        options={{
          headerShadowVisible: false,
          header: (props) => <Header {...props} />,
          title: "",
          contentStyle: {
            backgroundColor: "#f5f5f5",
          },
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group>
        <Stack.Screen
          name="HotelDetails"
          component={HotelDetails}
          options={{
            animation: "slide_from_right",
            presentation: "modal",
            headerTransparent: true,
            title: "",
            headerTintColor: "#fff",
            headerShadowVisible: true,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
