import React, {useEffect, useMemo} from "react";
import {ScrollView, Vibration, StyleSheet} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { setStatusBarStyle } from "expo-status-bar";
import { Hotel, RootTabScreenProps } from "../types";
import Section from "../components/Section";
import { getHotelsDetails } from "../api/hotels";
import HorizontalCardsList from "../components/HorizontalCardsList";
import VerticalCardsList from "../components/VerticalCardsList";
import {useQueryFilter} from "../hooks/useQueryFilter";

export const VIBRATION_TIME_MS = 500

export default function HomeScreen({
  navigation,
  route,
}: RootTabScreenProps<"Home">) {
  const [data, setData] = React.useState<Hotel[]>([]);
  const [bestOffers, setBestOffers] = React.useState<Hotel[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response: Hotel[] = (await getHotelsDetails()).data;
        setData(response);
        setBestOffers([...response].sort((a, b) => a.price - b.price));
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, []);

  const filteredData = useQueryFilter(data)
  const popularData = useMemo(() =>
    data.filter((_, index) => index < 5),
    [data],
  )

  useFocusEffect(
    React.useCallback(() => {
      setStatusBarStyle("auto");
    }, [])
  );

  useEffect(() => {
    if(filteredData.length === 0) {
      Vibration.vibrate(VIBRATION_TIME_MS)
    }
  }, [filteredData.length])

  if (loading) return <AppLoading />;

  if (route.params?.query) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Section title={`Search results for ${route.params.query}`}>
          <VerticalCardsList
            data={filteredData}
            onPress={(hotel: Hotel) =>
              navigation.navigate("HotelDetails", {
                hotel: hotel,
              })
            }
          />
        </Section>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Section
        title="Popular Hotels"
        containerStyle={{ paddingHorizontal: 0 }}
        titleContainerStyle={styles.titleContainerStyle}
      >
        <HorizontalCardsList
          data={popularData}
          onPress={(hotel: Hotel) =>
            navigation.navigate("HotelDetails", {
              hotel: hotel,
            })
          }
        />
      </Section>
      <Section title="Best offers">
        <VerticalCardsList
          data={bestOffers}
          onPress={(hotel: Hotel) =>
            navigation.navigate("HotelDetails", {
              hotel: hotel,
            })
          }
        />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
  },
  titleContainerStyle: {
    paddingHorizontal: 20,
  },
});
