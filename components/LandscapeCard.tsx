import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, View,StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { Hotel } from "../types";
import { getSignFromCurrency } from "../utils";
import { Text } from "./Themed";
import ImageWithPlaceholder from "./ImageWithPlaceholder";

export default function LandscapeCard(
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
  const [starsArray, setStarsArray] = React.useState<any[]>([]);

  React.useEffect(() => {
    const temp = [];
    for (let index = 0; index < stars; index++) {
      temp.push(
        <FontAwesome
          key={`${name}-${index}`}
          name="star"
          color="#fcba03"
          size={12}
          style={{ marginRight: 5 }}
        />
      );
    }
    setStarsArray(temp);
  }, []);

  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: pressed ? "#ededed" : "#fff" },
        styles.container,
        styles.shadow,
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
      <ImageWithPlaceholder source={{ uri: gallery[0] }} style={styles.image} />
      <View style={{ width: "70%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ width: "85%" }}>
            <Text
              bold
              style={{
                fontSize: 15,
                marginRight: 5,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {name}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              {starsArray}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <FontAwesome
              name="star"
              color="#fcba03"
              size={12}
              style={{ marginRight: 5 }}
            />
            <Text
              semibold
              style={{
                fontSize: 10,

                color: "#fcba03",
              }}
            >
              {userRating}
            </Text>
          </View>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            marginTop: 5,
          }}
        >
          <Text semibold style={{ fontSize: 18, marginRight: 5 }}>
            {getSignFromCurrency(currency)} {price}
          </Text>
          <Text style={{ fontSize: 11 }}>per night</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 8,
    flexDirection: "row",
    overflow: "hidden",
  },
  image: {
    height: 80,
    width: 80,
    flexGrow: 1,
    borderRadius: 10,
    marginRight: 10,
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
