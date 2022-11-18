import React from "react";
import { FlatList, StyleProp, ViewStyle,StyleSheet } from "react-native";
import { Hotel } from "../types";
import Divider from "./Divider";
import SmallCard from "./SmallCard";

export default function HorizontalCardsList({
  data,
  contentContainerStyle,
  onPress,
}: {
  data: Hotel[];
  contentContainerStyle?: StyleProp<ViewStyle>;
  onPress?: (hotel: Hotel) => void;
}) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <SmallCard {...item} onPress={onPress} />}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <Divider vertical />}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      bounces={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
});
