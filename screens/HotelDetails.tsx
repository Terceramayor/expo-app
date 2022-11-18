import { FontAwesome } from "@expo/vector-icons";
import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from "expo-status-bar";
import React from "react";
import { Image, ScrollView, StyleSheet, Platform, Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Swiper from "react-native-swiper";
import Divider from "../components/Divider";
import { Button, Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { RootTabScreenProps } from "../types";
import { getSignFromCurrency } from "../utils";
import ImageWithPlaceholder from "../components/ImageWithPlaceholder";

const PLACEHOLDER_IMAGE = require('../assets/images/placeholder.jpg')

export default function HotelDetails({
  route,
}: RootTabScreenProps<"HotelDetails">) {
  const { params } = route;
  const {
    hotel: {
      gallery,
      name,
      location,
      stars,
      price,
      userRating,
      checkIn,
      checkOut,
      contact,
      currency,
    },
  } = params;
  const [starsArray, setStarsArray] = React.useState<any[]>([]);
  const mapRef = React.createRef<MapView>();

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
    setStatusBarStyle("light");

    if (Platform.OS === 'android') {
      setStatusBarBackgroundColor("transparent", true);
    }

    mapRef.current?.animateCamera({
      center: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });
  }, []);

  const onPress = async () => {
    const url = `maps://maps.apple.com/?q=${location.address}&ll=${location.latitude},${location.latitude}`
    if (Platform.OS === 'ios') {
      if (await Linking.canOpenURL(url)) {
        try {
          await Linking.openURL(url);
        } catch (e) {
          console.error('error while opening url', e);
        }
      }
    }
  }

  return (
      <View style={styles.hotelDetailsContainer}>
        <ScrollView style={{ flex: 1 }}>
          <Swiper style={styles.swiper} activeDotColor="#fff">
            {gallery.map((image) => (
              <ImageWithPlaceholder defaultSource={PLACEHOLDER_IMAGE} source={{ uri: image }} style={{ flex: 1, resizeMode: 'cover' }} key={image} />
            ))}
          </Swiper>
          <View style={[styles.container]}>
            <View style={styles.title_section_container}>
              <View>
                <React.Fragment>
                  <Text semibold style={styles.title}>
                    {name}
                  </Text>
                  <View style={styles.stars}>{starsArray}</View>
                </React.Fragment>
                <View style={styles.address_container}>
                  <FontAwesome
                    name="map-marker"
                    color={Colors.light.primary}
                    size={15}
                    style={{ marginRight: 5 }}
                  />
                  <Text light style={styles.address}>
                    {location.address}
                  </Text>
                </View>
              </View>
              <View>
                <View style={styles.rating_container}>
                  <View style={styles.rating}>
                    <FontAwesome
                      name="star"
                      color="#fcba03"
                      style={{ marginRight: 5 }}
                    />
                    <Text semibold style={styles.rating_text}>
                      {userRating}
                    </Text>
                  </View>
                  <Text medium>Users rating</Text>
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
            </View>
            <Divider horizontal color="rgba(0, 0, 0, 0.05)" />
            <View>
              <Text semibold style={{ fontSize: 17, marginBottom: 5 }}>
                Contacts
              </Text>
              <View style={{ flexDirection: "row", marginBottom: 5 }}>
                <Text medium style={{ marginRight: 5 }}>
                  Phone
                </Text>
                <Text>{contact.phoneNumber}</Text>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 5 }}>
                <Text medium style={{ marginRight: 5 }}>
                  Email
                </Text>
                <Text>{contact.email}</Text>
              </View>
            </View>
            <Divider horizontal color="rgba(0, 0, 0, 0.05)" />
            <View
              style={{
                flexDirection: "row",
                width: "50%",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text semibold style={{ fontSize: 17, marginBottom: 5 }}>
                  Check in
                </Text>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text medium style={{ marginRight: 5 }}>
                    from
                  </Text>
                  <Text>{checkIn.from}</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text medium style={{ marginRight: 5 }}>
                    to
                  </Text>
                  <Text>{checkIn.to}</Text>
                </View>
              </View>
              <View>
                <Text semibold style={{ fontSize: 17, marginBottom: 5 }}>
                  Check out
                </Text>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text medium style={{ marginRight: 5 }}>
                    from
                  </Text>
                  <Text>{checkOut.from}</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                  <Text medium style={{ marginRight: 5 }}>
                    to
                  </Text>
                  <Text>{checkOut.to}</Text>
                </View>
              </View>
            </View>
            <Divider horizontal color="rgba(0, 0, 0, 0.05)" />
            <MapView
              ref={mapRef}
              style={{
                width: "100%",
                height: 200,
              }}
              zoomEnabled
              zoomTapEnabled
              zoomControlEnabled
              minZoomLevel={18}
            >
              <Marker
                title={name}
                onPress={onPress}
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
              />
            </MapView>
            <Divider horizontal />
            <Button title="Book now" onPress={() => {}} style={{}} />
          </View>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  hotelDetailsContainer: {
    flex:1
  },
  swiper: {
    position:"relative",
    height: 300,
  },
  container: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -15,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  title_section_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    marginBottom: 5,
  },
  address_container: { flexDirection: "row", alignItems: "center" },
  address: {
    fontSize: 14,
    color: "grey",
  },
  stars: {
    flexDirection: "row",
    marginBottom: 5,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating_text: {
    fontSize: 15,
    color: "#fcba03",
  },
  rating_container: {
    alignItems: "center",
  },
});
