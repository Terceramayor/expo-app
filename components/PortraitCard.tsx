import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { Hotel } from "../types";
import { Text, View } from "./Themed";
import ImageBackgroundWithPlaceholder from "./ImageBackgroundWithPlaceholder";

export default function PortraitCard(
  props: Hotel & { onPress?: (hotel: Hotel) => void }
) {
  const {
    gallery,
    name,
    location,
    userRating,
    price,
    currency,
    stars,
    onPress,
  } = props;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.8 : 1 },
      ]}
      onPress={() =>
        onPress &&
        onPress({
          id: props.id,
          checkIn: props.checkIn,
          checkOut: props.checkOut,
          contact: props.contact,
          gallery,
          name,
          location,
          userRating,
          price,
          currency,
          stars,
        })
      }
    >
      <ImageBackgroundWithPlaceholder style={styles.image} source={{ uri: gallery[0] }}>
        <View style={[styles.box, { backgroundColor: "#fcba03" }]}>
          <FontAwesome name="star" color="#fff" size={12} />
          <Text
            semibold
            style={{
              fontSize: 10,
              textAlign: "right",
              color: "#fff",
            }}
          >
            {userRating}
          </Text>
        </View>
      </ImageBackgroundWithPlaceholder>
      <View>
        <Text bold>{name}</Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <FontAwesome
            name="map-marker"
            color={Colors.light.primary}
            size={15}
            style={{ marginRight: 5 }}
          />
          <Text light style={{ fontSize: 12, color: "grey" }}>
            {location.address}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    margin: 1,
  },
  image: {
    overflow: "hidden",
    position: "relative",
    borderRadius: 15,
    width: "100%",
    height: 220,
    marginBottom: 8,
    backgroundColor: "#fff",
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
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 5,
    width: 35,
    padding: 5,
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
